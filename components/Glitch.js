import { useState, cloneElement, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import uniqueId from "lodash.uniqueid";

export default function GlitchLink(props) {
	const { box, el, children } = props;
	const timerIdRef1 = useRef(0);
	const timerIdRef2 = useRef(0);
	const timerIdRef3 = useRef(0);
	const [hoverStyle, updateHoverStyle] = useState({
		position: "absolute",
		pointerEvents: "none",
		color: "red",
	});

	const cleanup = () => {
		clearInterval(timerIdRef1.current);
		clearInterval(timerIdRef2.current);
		clearInterval(timerIdRef3.current);
		timerIdRef1.current = 0;
		timerIdRef2.current = 0;
		timerIdRef3.current = 0;
	};

	useEffect(() => {
		const currentBox = {
			top: 0,
			left: 0,
			width: box.width,
			height: box.height,
		};

		timerIdRef1.current = setTimeout(() => {
			updateHoverStyle((hoverStyle) => ({
				...hoverStyle,
				...currentBox,
				transform: `translateX(${Math.random() * 10 - 5}px)`,
			}));
		}, 50);

		timerIdRef2.current = setTimeout(() => {
			updateHoverStyle((hoverStyle) => ({
				...hoverStyle,
				...currentBox,
				transform: `translateX(0)`,
			}));
		}, 100);

		timerIdRef3.current = setTimeout(() => {
			updateHoverStyle((hoverStyle) => ({
				...hoverStyle,
				...currentBox,
				transform: `translateX(${Math.random() * 5 - 2.5}px)`,
			}));
		}, 150);

		return () => cleanup();
	}, [box]);

	return cloneElement(children, { style: hoverStyle });
}
