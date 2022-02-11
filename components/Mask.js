import { useState, cloneElement, useRef, useCallback, useEffect } from "react";

const createEl = (template) => {
	let el = document.createElement("div");
	el.innerHTML = template.trim();
	return el.firstChild;
};

const createSvgEl = (template) => {
	let el = createEl(
		`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${template.trim()}</svg>`
	);
	return el;
};

const createSvgChildEl = (template) => {
	let el = createSvgEl(template).firstChild;
	return el;
};

export const createMasksWithStripes = (count, box, averageHeight = 10, id) => {
	let totalMaskIdx = 0;
	let masks = [];
	for (let i = 0; i < count; i++) {
		masks.push([]);
	}
	let maskNames = [];
	for (let i = totalMaskIdx; i < totalMaskIdx + masks.length; i++) {
		maskNames.push(`glitch-${Math.floor(Math.random() * 100)}${i}`);
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
};
