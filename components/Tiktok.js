import React, { useEffect } from "react";
import Link from "next/link";
import tinycolor from "tinycolor2";
import uniqueId from "lodash.uniqueid";
import { motion, useAnimation, animate, useMotionValue } from "framer-motion";
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

const Tiktok = () => {
	const timeouts = React.useRef(new Map());
	const masksEl = React.useRef(null);
	const boxRef = React.useRef(null);
	const [isHovered, setIsHovered] = React.useState(false);
	const [id] = React.useState(() => uniqueId("glitch-"));

	const glitchOneAnimate = useAnimation();
	const glitchTwoAnimate = useAnimation();
	const color = useMotionValue('#fff');

	useEffect(() => {
		const animated = async () => {

			if (isHovered) {
				console.log('glitch1 hover')
				await glitchOneAnimate.start({ opacity: 1, transition: { delay: 1, duration: 1 }});
				await glitchOneAnimate.start({ opacity: 0, transition: { delay: 2, duration: 1 }});
				await glitchOneAnimate.start({
					color: '#000',
					transition: {
						delay: 3,
						duration: 1,
						repeat: Infinity,
						repeatType: "mirror",
					},
				});
				// await outerCircleAnimation.start(["pulseOut", "pulseIn"], {
				// 	repeat: Infinity,
				// 	repeatType: "mirror",
				// });
			} else {
				console.log('glitch1 out')
				// await outerCircleAnimation.start("circle");
			}
		}

		animated();
	}, [isHovered, glitchOneAnimate]);

	useEffect(() => {
		const animate = async () => {
			if (isHovered) {
				console.log('glitch2 hover')
				// await innerCircleAnimation.start("square");
				// await innerCircleAnimation.start("invisible");
			} else {
				console.log('glitch2 out')
				// await innerCircleAnimation.start("circle");
			}
		}
		animate()
	}, [isHovered]);

	return (
		<Link href="/z" passHref>
			<a
				ref={boxRef}
				className="flex justify-center cursor-pointer bg-[#fff] text-white"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="relative">
					<div>GAIA Skin Naturals</div>
						<React.Fragment>
							<motion.div
								className="absolute top-0 left-0"
								animate={glitchOneAnimate}
							>
								GAIA Skin Naturals
							</motion.div>
							<motion.div
								className="absolute top-0 left-0"
							>
								GAIA Skin Naturals
							</motion.div>
							<motion.div
								className="absolute top-0 left-0"
							>
								GAIA Skin Naturals
							</motion.div>
						</React.Fragment>
					{!isHovered && (
						<React.Fragment>
							<motion.div
								className="absolute top-0 left-0"
								animate={glitchOneAnimate}
							>
								GAIA Skin Naturals
							</motion.div>
							<motion.div
								className="absolute top-0 left-0"
							>
								GAIA Skin Naturals
							</motion.div>
							<motion.div
								className="absolute top-0 left-0"
							>
								GAIA Skin Naturals
							</motion.div>
						</React.Fragment>
					)}
				</div>
			</a>
		</Link>
	);

}

export default Tiktok