import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dynamics from "dynamics.js";
import tinycolor from "tinycolor2";
import uniqueId from "lodash.uniqueid";

export default function GlitchLink({ children, href, className }) {
	const [hoverRef] = useHover();
	const [id] = useState(() => uniqueId("glitch-"));

	return (
		<Link href={href} passHref scroll>
			<a ref={hoverRef} className={className}>
				<span id={id}>{children}</span>
			</a>
		</Link>
	);
}

function createEl(template) {
	let el = document.createElement("div");
	el.innerHTML = template.trim();
	return el.firstChild;
}

function createSvgEl(template) {
	let el = createEl(
		`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${template.trim()}</svg>`
	);
	return el;
}

function createSvgChildEl(template) {
	let el = createSvgEl(template).firstChild;
	return el;
}

function createMasksWithStripes(count, box, averageHeight = 10) {
	let totalMaskIdx = 0;
	let masks = [];
	for (let i = 0; i < count; i++) {
		masks.push([]);
	}
	let maskNames = [];
	for (let i = totalMaskIdx; i < totalMaskIdx + masks.length; i++) {
		maskNames.push(`clipPath${i}`);
	}
	totalMaskIdx += masks.length;
	let maskIdx = 0;
	let x = 0;
	let y = 0;
	let stripeHeight = averageHeight;
	while (true) {
		let w = Math.max(
			stripeHeight * 10,
			Math.round(Math.random() * box.width)
		);
		masks[maskIdx].push(
			`M ${x},${y} L ${x + w},${y} L ${x + w},${
				y + stripeHeight
			} L ${x},${y + stripeHeight} Z`
		);

		maskIdx += 1;
		if (maskIdx >= masks.length) {
			maskIdx = 0;
		}

		x += w;
		if (x > box.width) {
			x = 0;
			y += stripeHeight;
			stripeHeight = Math.round(
				Math.random() * averageHeight + averageHeight / 2
			);
		}
		if (y >= box.height) {
			break;
		}
	}

	masks.forEach(function (rects, i) {
		let el = createSvgChildEl(
			`<clipPath id="${maskNames[i]}"><path d="${rects.join(
				" "
			)}" fill="white"></path></clipPath>`
		);
		document.querySelector("#clip-paths g").appendChild(el);
	});

	return maskNames;
}

function cloneAndStripeElement(element, clipPathName, parent) {
	let el = element.cloneNode(true);
	let box = element.getBoundingClientRect();
	let parentBox = parent.getBoundingClientRect();
	box = {
		top: box.top - parentBox.top,
		left: box.left - parentBox.left,
		width: box.width,
		height: box.height,
	};
	let style = window.getComputedStyle(element);

	dynamics.css(el, {
		position: "absolute",
		left: Math.round(box.left),
		top: Math.round(box.top),
		width: Math.ceil(box.width),
		height: Math.ceil(box.height),
		display: "none",
		pointerEvents: "none",
		background: "#000",
		fontSize: style.fontSize,
		fontFamily: style.fontFamily,
		color: style.color,
		textDecoration: style.textDecoration,
	});
	parent.appendChild(el);
	el.style["-webkit-clip-path"] = `url(/#${clipPathName})`;
	el.style["clip-path"] = `url(/#${clipPathName})`;

	return el;
}

function animateLink(ref) {
	const el = ref.current;
	const currentElId = ref.current.childNodes[0].id;
	let animating = true;
	let box = el.getBoundingClientRect();
	let currentEl = document.querySelector(`#${currentElId}`);

	let animate = function () {
		let masks = createMasksWithStripes(3, box, 3);
		let clonedEls = [];

		for (let i = 0; i < masks.length; i++) {
			let clonedEl = cloneAndStripeElement(currentEl, masks[i], el);

			let childrenEls = Array.prototype.slice.apply(
				clonedEl.querySelectorAll("path")
			);

			childrenEls.push(clonedEl);

			for (let k = 0; k < childrenEls.length; k++) {
				let color = tinycolor(
					`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
				);
				let rgb = color.toRgbString();
				dynamics.css(childrenEls[k], {
					color: rgb,
					fill: rgb,
				});
			}

			clonedEl.style.display = "";
			clonedEls.push(clonedEl);
		}

		for (let i = 0; i < clonedEls.length; i++) {
			let clonedEl = clonedEls[i];
			dynamics.css(clonedEl, {
				translateX: Math.random() * 10 - 5,
			});

			dynamics.setTimeout(function () {
				dynamics.css(clonedEl, {
					translateX: 0,
				});
			}, 50);

			dynamics.setTimeout(function () {
				dynamics.css(clonedEl, {
					translateX: Math.random() * 5 - 2.5,
				});
			}, 100);

			dynamics.setTimeout(function () {
				el.removeChild(clonedEl);
			}, 150);
		}

		dynamics.setTimeout(function () {
			if (animating) {
				animate();
			}
			for (let i = 0; i < masks.length; i++) {
				let maskEl = document.querySelector(`#${masks[i]}`);
				maskEl.parentNode.removeChild(maskEl);
			}
		}, Math.random() * 800);
	};

	animate();

	return {
		stop: function () {
			animating = false;
		},
	};
}

function useHover() {
	const [value, setValue] = useState(false);
	const ref = useRef(null);
	let r = null;

	useEffect(
		() => {
			const node = ref.current;

			const handleMouseOver = (e) => {
				console.log(r);
				r = animateLink(ref);
				console.log(r);
			};

			const handleMouseOut = (e) => {
				console.log(r);
				r.stop();
			};
			if (node) {
				node.addEventListener("mouseover", handleMouseOver);
				node.addEventListener("mouseout", handleMouseOut);
				return () => {
					node.removeEventListener("mouseover", handleMouseOver);
					node.removeEventListener("mouseout", handleMouseOut);
				};
			}
		},
		[] // Recall only if ref changes
	);
	return [ref];
}
