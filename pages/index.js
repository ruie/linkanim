import Image from "next/image";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("@components/Link"), { ssr: false });
const ALink = dynamic(() => import("@components/Alink"), { ssr: false });

export default function IndexPage() {
	return (
		<div className="flex flex-col items-center justify-center space-y-3 text-white">
			<Link className="relative flex" href="/about">
				<svg
					fill="none"
					width={21}
					height={16}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 23 18"
				>
					<path
						d="M14.2382 13.97c2.3472 0 4.25-1.9028 4.25-4.25003 0-2.34721-1.9028-4.25-4.25-4.25-2.3473 0-4.25004 1.90279-4.25004 4.25 0 2.34723 1.90274 4.25003 4.25004 4.25003z"
						fill="#A6A8AB"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M11.8003 0c-.2653 0-.5003.171214-.5817.423772l-.5781 1.795038H6.55278v-.6077C6.55278 1.2736 6.27917 1 5.94166 1H3.49722c-.33751 0-.61111.2736-.61111.61111v.6077h-.90138c-.67501 0-1.222218.54721-1.222218 1.22222V15.9966c0 .675.547208 1.2222 1.222218 1.2222H21.5403c.675 0 1.2222-.5472 1.2222-1.2222V3.44103c0-.67501-.5472-1.22222-1.2222-1.22222h-3.7669L17.1953.423772C17.114.171215 16.8789 0 16.6136 0h-4.8133zm2.4379 15.22c3.0375 0 5.5-2.4625 5.5-5.50003 0-3.03757-2.4625-5.5-5.5-5.5-3.0376 0-5.50004 2.46243-5.50004 5.5 0 .98643.25968 1.91223.71441 2.71273-.31062.1696-.52133.4993-.52133.8782 0 .5522.44772 1 1 1 .31436 0 .59486-.1451.77816-.372.9551.7997 2.1857 1.2811 3.5288 1.2811z"
						fill="#A6A8AB"
					/>
				</svg>
				Gaia Skin Naturals
			</Link>
			<hr />
			<ALink className="relative flex outline outline-white" href="/about">
				<span>Sudocrem</span>
			</ALink>

			<ALink className="relative flex outline outline-white" href="/about">
				<span>Sudocrem</span>
			</ALink>
			<ALink className="relative flex outline outline-white" href="/about">
				<span>Sudocrem</span>
			</ALink>
			<ALink className="relative flex outline outline-white" href="/about">
				<span>Sudocrem</span>
			</ALink>
		</div>
	);
}
