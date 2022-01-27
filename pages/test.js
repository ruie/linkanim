import { useState, useEffect, useRef, useCallback } from 'react';

export default function TestApp() {
	const intervalRef = useRef(null);
	const [isHover, setIsHover] = useState(false);

	const loop = () => {
		if (isHover) {
			// Do everything again if there's still a winner in the result.
			return loop();
		}
	};

	const mouseOver = () => {
		setIsHover(true)
		console.log('test')
		loop()
	}
	const mouseOut = () => {
		setIsHover(false)
	}

	return (
		<div>
			<div className='text-white'
				onMouseOver={() => mouseOver()}
				onMouseOut={() => mouseOut()}
			>
				{`HOVER ME: ${isHover ? 'Yes' : 'No'}`}
			</div>
		</div>
	);
};
