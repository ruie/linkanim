import { useState, cloneElement, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import tinycolor from "tinycolor2";
import uniqueId from "lodash.uniqueid";

export default function GlitchLink(props) {
	const { box, children, id, mask } = props;
	const timerIdRef1 = useRef(0);
	const timerIdRef2 = useRef(0);
	const timerIdRef3 = useRef(0);
	const [hoverStyle, updateHoverStyle] = useState({
		position: "absolute",
		pointerEvents: "none",
	});

	const cleanup = () => {
		clearInterval(timerIdRef1.current);
		clearInterval(timerIdRef2.current);
		clearInterval(timerIdRef3.current);
		timerIdRef1.current = 0;
		timerIdRef2.current = 0;
		timerIdRef3.current = 0;
	};

	const color = tinycolor(`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`);

	useEffect(() => {
		const rgb = color.toRgbString();
		const currentBox = {
			top: 0,
			left: 0,
			width: box.width,
			height: box.height,
			color: rgb,
			fill: rgb,
			background: "#000",
		};

		timerIdRef1.current = setTimeout(() => {
			updateHoverStyle((hoverStyle) => ({
				...hoverStyle,
				...currentBox,
				transform: `translateX(${Math.random() * 10 - 5}px)`,
				clipPath: `url(#${mask})`,
			}));
		}, 50);

		timerIdRef2.current = setTimeout(() => {
			updateHoverStyle((hoverStyle) => ({
				...hoverStyle,
				...currentBox,
				transform: `translateX(0)`,
				clipPath: `url(#${mask})`,
			}));
		}, 100);

		timerIdRef3.current = setTimeout(() => {
			updateHoverStyle((hoverStyle) => ({
				...hoverStyle,
				...currentBox,
				transform: `translateX(${Math.random() * 5 - 2.5}px)`,
				clipPath: `url(#${mask})`,
			}));
		}, 150);

		return () => cleanup();
	}, [box]);

	return cloneElement(children, { style: hoverStyle });
}
