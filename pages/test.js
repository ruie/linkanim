import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import tinycolor from "tinycolor2";

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
	const [isHovered, setIsHovered] = React.useState(false);
	const [color, setColor] = React.useState("#000");
	const [color2, setColor2] = React.useState("#000");
	const [color3, setColor3] = React.useState("#000");

	const handleMouseEnter = React.useCallback(() => {
		setColor(
			tinycolor(
				`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
			).toRgbString()
		);
		setIsHovered(true);
	}, []);

	const handleMouseOut = React.useCallback(() => {
		setIsHovered(false);
	}, []);

	React.useEffect(() => {
		console.log("effects", isHovered, color, color2, color3);
		if (isHovered) {
			const timerId = setTimeout(() => {
				setColor(
					tinycolor(
						`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
					).toRgbString()
				);
				setColor2(
					tinycolor(
						`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
					).toRgbString()
				);
				setColor3(
					tinycolor(
						`hsl(${Math.round(Math.random() * 360)}, 80%, 65%)`
					).toRgbString()
				);
			}, Math.random() * 500);

			return () => {
				clearTimeout(timerId);
			};
		}

		setColor("#000");
		setColor2("#000");
		setColor3("#000");
	}, [isHovered, color, color2, color3]);

	return (
		<div className="">
			<Link href="/test" passHref>
				<a
					className="flex justify-center cursor-pointer bg-[#fff]"
					onMouseEnter={() => handleMouseEnter()}
					onMouseLeave={() => handleMouseOut()}
				>
					<div className="relative overflow-hidden">
						<div>GAIA Skin Naturals</div>
						<div
							className="absolute top-0 left-0"
							style={{ color: `${color}` }}
						>
							GAIA Skin Naturals
						</div>
						<div
							className="absolute top-0 left-0"
							style={{ color: `${color2}` }}
						>
							GAIA Skin Naturals
						</div>
						<div
							className="absolute top-0 left-0"
							style={{ color: `${color3}` }}
						>
							GAIA Skin Naturals
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
}
