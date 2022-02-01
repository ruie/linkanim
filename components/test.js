import React from "react";
import Link from "next/link";
import tinycolor from "tinycolor2";
import { createMasksWithStripes, cloneAndStripeElement } from "./glitch";

const defaultGlitch = {
	first: {
		color: "#000",
		posX: 0,
	},
	second: {
		color: "#000",
		posX: 0,
	},
	third: {
		color: "#000",
		posX: 0,
	},
};

export default function Test() {
	const timeouts = React.useRef(new Map());
	const [isHovered, setIsHovered] = React.useState(false);
	const [glitch, setGlitch] = React.useState(defaultGlitch);

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
			const posX = Math.random() * 5 - 2.5;
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
		console.log("effects", isHovered, glitch, timeouts.current);
		if (isHovered) {
			setNewTimeout("g-1", Math.random() * 1000, () => {
				randomGlitch("first");
				randomGlitch("second");
				randomGlitch("third");
			});
			setNewTimeout("g-2", Math.random() * 1200, () => {
				randomGlitch("second");
			});
			setNewTimeout("g-3", Math.random() * 1400, () => {
				randomGlitch("default");
			});
			setNewTimeout("g-4", Math.random() * 1400, () => {
				randomGlitch("third");
			});
			return () => {
				console.log("effects clear", isHovered, glitch);
				Array.from(timeouts.current.values()).forEach(clearTimeout);
			};
		}
		randomGlitch("default");
	}, [isHovered, glitch.first.color, glitch.second.color, glitch.third.color]);

	return (
		<Link href="/test" passHref>
			<a
				className="flex justify-center cursor-pointer bg-[#fff]"
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
								}}
							>
								GAIA Skin Naturals
							</div>
							<div
								className="absolute top-0 left-0"
								style={{
									color: `${glitch.second.color}`,
									transform: `translateX(${glitch.second.posX}%)`,
								}}
							>
								GAIA Skin Naturals
							</div>
							<div
								className="absolute top-0 left-0"
								style={{
									color: `${glitch.third.color}`,
									transform: `translateX(${glitch.third.posX}%)`,
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
