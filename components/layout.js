import dynamic from "next/dynamic";

const Header = dynamic(() => import("@components/header"), { ssr: false });

export default function Layout(props) {
	return (
		<div className="flex flex-col min-h-screen text-black">
			<svg
				id="clip-paths"
				width={0}
				height={0}
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<g />
			</svg>
			{/* <Header /> */}
			<main className="flex-1 px-4 py-6 mx-auto lg:container md:px-6 md:py-12">
				{props.children}
			</main>
		</div>
	);
}
