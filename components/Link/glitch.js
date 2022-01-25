import dynamics from "dynamics.js";

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

function createMasksWithStripes(count, box, averageHeight = 10, id) {
	let totalMaskIdx = 0;
	let masks = [];
	for (let i = 0; i < count; i++) {
		masks.push([]);
	}
	let maskNames = [];
	for (let i = totalMaskIdx; i < totalMaskIdx + masks.length; i++) {
		maskNames.push(`clipPath-${id}-${i}`);
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
			`M ${x},${y} L ${x + w},${y} L ${x + w},${y + stripeHeight} L ${x},${
				y + stripeHeight
			} Z`
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
	el.style["-webkit-clip-path"] = `url(#${clipPathName})`;
	el.style["clip-path"] = `url(#${clipPathName})`;

	return el;
}

export { cloneAndStripeElement, createMasksWithStripes };
