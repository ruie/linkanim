import { useState, cloneElement, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import uniqueId from "lodash.uniqueid";

import Glitch from "./Glitch";

export default function ALink({ children, href, className }) {
	const ref = useRef(false);
	const timerIdRef = useRef(0);
	const [isHover, setIsHover] = useState(true);
	const [id] = useState(() => uniqueId("glitch-"));

	const [hoverStyle, updateHoverStyle] = useState({
		position: "absolute",
		pointerEvents: "none",
		zIndex: 1,
	});

	const [glitches, setGlitches] = useState([]);

	const setVisibility = useCallback((flag, children) => {
		setIsHover(flag);

		const box = ref.current.getBoundingClientRect();
		setGlitches(
			[1, 2, 3].map((index) => {
				return (
					<Glitch key={`g-${index}`} box={box}>
						{children}
					</Glitch>
				);
			})
		);

		timerIdRef.current = setTimeout(() => {
			setGlitches([]);
		}, 200);
	}, []);

	const linkCleanup = () => {
		setGlitches([]);
		clearInterval(timerIdRef.current);
		timerIdRef.current = 0;
	};

	useEffect(() => {
		return () => linkCleanup();
	}, [setGlitches]);

	return (
		<Link href={href} passHref>
			<a
				ref={ref}
				className={className}
				onMouseOver={() => setVisibility(true, children)}
				onMouseOut={() => setVisibility(false, children)}
			>
				<div id={id}>{children}</div>
				{glitches.length > 0 && glitches}
			</a>
		</Link>
	);

	// return cloneElement(children, {});
}
