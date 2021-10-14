export default function Layout(props) {
	return (
		<div className="flex flex-col min-h-screen bg-black">
			<main className="flex-1 px-4 py-6 mx-auto lg:container md:px-6 md:py-12">
				{props.children}
			</main>
		</div>
	);
}
