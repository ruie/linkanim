import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import dynamics from "dynamics.js";
import tinycolor from "tinycolor2";
import { createMasksWithStripes, cloneAndStripeElement } from "./glitch";

export default function GlitchLink({ children, href, className }) {
	const [hoverRef] = useHover();
	const [id] = useState("glitch-");

	return (
		<Link href={href} passHref>
			<a ref={hoverRef} className={className}>
				<span id={id}>{children}</span>
			</a>
		</Link>
	);
}

function useHover() {
	const ref = useRef(null);

	const animateLink = useCallback((ref) => {
		const el = ref.current;
		const currentElId = ref.current.childNodes[0].id;
		let animating = true;
		let box = el.getBoundingClientRect();
		let currentEl = document.querySelector(`#${currentElId}`);

		let animate = function () {
			let masks = createMasksWithStripes(3, box, 3, currentElId);
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
					console.log("test");
					let maskEl = document.querySelector(`#${masks[i]}`);
					maskEl.parentNode.removeChild(maskEl);
				}
			}, Math.random() * 200);
		};

		animate();

		return {
			stop: function () {
				animating = false;
			},
		};
	}, []);

	useEffect(
		() => {
			const node = ref.current;
			let r = null;

			const handleMouseOver = () => {
				r = animateLink(ref);
			};

			const handleMouseOut = () => {
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
		[animateLink] // Recall only if ref changes
	);
	return [ref];
}
