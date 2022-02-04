import React from "react";
import Link from "next/link";
import tinycolor from "tinycolor2";

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

	const setNewTimeout = (name, delay, cb) => {
		if (timeouts.current.has(name)) {
			clearTimeout(timeouts.current.get(name));
		}
		timeouts.current.set(name, setTimeout(cb, delay));
	};

	const randomGlitch = (key, max) => {
		if (key === "default") {
			setGlitch(defaultGlitch);
		}
		setGlitch((state) => {
			const color = tinycolor(
				`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
			).toRgbString();
			const num1 = max  === 'max' ? 10 : 5;
			const num2 = max  === 'max' ? 5 : 3.5;
			const posX = Math.random() * num1 - num2;
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
		randomGlitch("first", 'max');
		randomGlitch("second", 'max');
		randomGlitch("third", 'max');
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
					`${Math.floor(Math.random() * 100)}`
				)
			);
			setNewTimeout("g-batch", Math.random() * 350, () => {
				console.log('ba')
				setNewTimeout("g-1", Math.random() * 250, () => {
					console.log('50')
					randomGlitch("first", 'min');
					randomGlitch("second", 'min');
					randomGlitch("third", 'min');
				});
				randomGlitch("default");
			});
			return () => {
				console.log('cler')
				masksEl.current = document.querySelector(`#clip-paths > g`);
				while (masksEl.current.firstChild) {
					masksEl.current.removeChild(masksEl.current.firstChild);
				}
				setMasks(
					createMasksWithStripes(
						3,
						box,
						3,
						`${Math.floor(Math.random() * 100)}`
					)
				);
				Array.from(timeouts.current.values()).forEach(clearTimeout);
			};
		}
		randomGlitch("default");
	}, [
		isHovered,
		glitch.first.color,
		glitch.second.color,
		glitch.third.color,
	]);

	return (
		<Link href="/z" passHref>
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
