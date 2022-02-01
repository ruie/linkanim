import React from "react";
import Link from "next/link";
import tinycolor from "tinycolor2";
import uniqueId from "lodash.uniqueid";

import { createMasksWithStripes } from "./Mask";

const defaultGlitch = {
	first: {
		color: "#fff",
		posX: 0,
	},
	second: {
		color: "#fff",
		posX: 0,
	},
	third: {
		color: "#fff",
		posX: 0,
	},
};

export default function Test({ children }) {
	const timeouts = React.useRef(new Map());
	const masksEl = React.useRef(null);
	const boxRef = React.useRef(null);
	const [isHovered, setIsHovered] = React.useState(false);
	const [glitch, setGlitch] = React.useState(defaultGlitch);
	const [masks, setMasks] = React.useState([]);
	const [id] = React.useState(() => uniqueId("glitch-"));

	const setNewTimeout = (name, delay, cb) => {
		if (timeouts.current.has(name)) {
			clearTimeout(timeouts.current.get(name));
		}
		timeouts.current.set(name, setTimeout(cb, delay));
	};

	const randomGlitch = (key) => {
		if (key === "default") {
			setGlitch(defaultGlitch);
		}
		setGlitch((state) => {
			const color = tinycolor(
				`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
			).toRgbString();
			const posX = Math.random() * 10 - 5;
			return {
				...state,
				[key]: {
					color,
					posX,
				},
			};
		});
	};

	const handleMouseEnter = React.useCallback(() => {
		randomGlitch("first");
		randomGlitch("second");
		randomGlitch("third");
		setIsHovered(true);
	}, []);

	const handleMouseOut = React.useCallback(() => {
		setIsHovered(false);
	}, []);

	React.useEffect(() => {
		const box = boxRef.current.getBoundingClientRect();
		if (isHovered) {
			setMasks(
				createMasksWithStripes(
					3,
					box,
					3,
					`${id}-${Math.floor(Math.random() * 1000)}`
				)
			);
			setNewTimeout("g-batch", Math.random() * 500, () => {
				setNewTimeout("g-1", 50, () => {
					randomGlitch("first");
					randomGlitch("second");
					randomGlitch("third");
				});
				setNewTimeout("g-2", 150, () => {
					randomGlitch("first");
					randomGlitch("second");
				});
				setNewTimeout("g-3", 200, () => {
					randomGlitch("second");
					randomGlitch("third");
				});
				randomGlitch("default");
			});
			return () => {
				// console.log("effects clear", isHovered, glitch);
				masksEl.current = document.querySelector(`#clip-paths > g`);
				while (masksEl.current.firstChild) {
					masksEl.current.removeChild(masksEl.current.firstChild);
				}
				Array.from(timeouts.current.values()).forEach(clearTimeout);
			};
		}
		randomGlitch("default");
	}, [
		isHovered,
		glitch.first.color,
		glitch.second.color,
		glitch.third.color,
		id,
	]);

	return (
		<Link href="/" passHref>
			<a
				ref={boxRef}
				className="flex justify-center cursor-pointer bg-[#fff] text-white"
				onMouseEnter={() => handleMouseEnter()}
				onMouseLeave={() => handleMouseOut()}
			>
				<div className="relative">
					<div>GAIA Skin Naturals</div>
					{isHovered && (
						<React.Fragment>
							<div
								className="absolute top-0 left-0"
								style={{
									color: `${glitch.first.color}`,
									transform: `translateX(${glitch.first.posX}%)`,
									background: "#000",
									fill: `${glitch.first.color}`,
									width: boxRef.current.width,
									height: boxRef.current.height,
									clipPath: `url(#${masks[0]})`,
								}}
							>
								GAIA Skin Naturals
							</div>
							<div
								className="absolute top-0 left-0"
								style={{
									color: `${glitch.second.color}`,
									transform: `translateX(${glitch.second.posX}%)`,
									background: "#000",
									fill: `${glitch.second.color}`,
									width: boxRef.current.width,
									height: boxRef.current.height,
									clipPath: `url(#${masks[1]})`,
								}}
							>
								GAIA Skin Naturals
							</div>
							<div
								className="absolute top-0 left-0"
								style={{
									color: `${glitch.third.color}`,
									transform: `translateX(${glitch.third.posX}%)`,
									background: "#000",
									fill: `${glitch.third.color}`,
									width: boxRef.current.width,
									height: boxRef.current.height,
									clipPath: `url(#${masks[2]})`,
								}}
							>
								GAIA Skin Naturals
							</div>
						</React.Fragment>
					)}
				</div>
			</a>
		</Link>
	);
}
