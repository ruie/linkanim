import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import uniqueId from "lodash.uniqueid";
import { createMasksWithStripes } from "./Mask";

import Glitch from "./Glitch";

export default function ALink({ children, href, className }) {
	const ref = useRef(false);
	const hoverIntervalRef = useRef(0);
	const timerIdRef = useRef(0);
	const [isHover, setIsHover] = useState(true);
	const [id] = useState(() => uniqueId("glitch-"));

	const [hoverStyle, updateHoverStyle] = useState({
		position: "absolute",
		pointerEvents: "none",
		zindex: 1,
	});

	const [glitches, setGlitches] = useState([]);

	const setVisibility = useCallback(
		(flag, children) => {
			const box = ref.current.getBoundingClientRect();
			const masks = createMasksWithStripes(3, box, 3, id);
			if (isHover) {
				hoverIntervalRef.current = setInterval(() => {
					console.log("test");
				}, 250);
			} else {
				clearInterval(hoverIntervalRef.current);
			}

			setGlitches(
				[1].map((index, i) => {
					return (
						<Fragment key={`k-${i}`}>
							<Glitch key={`g-${index}`} box={box} mask={masks[0]}>
								{children}
							</Glitch>
							<Glitch key={`q-${index}`} box={box} mask={masks[1]}>
								{children}
							</Glitch>
							<Glitch key={`t-${index}`} box={box} mask={masks[2]}>
								{children}
							</Glitch>
						</Fragment>
					);
				})
			);

			timerIdRef.current = setTimeout(() => {
				setGlitches([]);
			}, 200);
		},
		[id, isHover]
	);

	const linkCleanup = () => {
		setGlitches([]);
		clearInterval(hoverIntervalRef.current);
		clearInterval(timerIdRef.current);
		timerIdRef.current = 0;
	};

	useEffect(() => {
		return () => linkCleanup();
	}, []);

	return (
		<Link href={href} passHref>
			<a
				ref={ref}
				className={className}
				onMouseOver={() => {
					setIsHover(true);
					setVisibility(true, children);
				}}
				onMouseOut={() => {
					setIsHover(false);
					setVisibility(false, children);
				}}
			>
				<div id={id}>{children}</div>
				{glitches.length > 0 && glitches}
			</a>
		</Link>
	);

	// return cloneElement(children, {});
}
