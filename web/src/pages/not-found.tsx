export function NotFound() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="flex flex-col">
				<h1 className="text-gray-100 font-semibold text-2xl mb-10">
					Ops! Essa página não existe. 🥲
				</h1>
				<a
					href="/"
					className="font-semibold text-center text-gray-100 hover:text-blue-base transition ease-linear"
				>
					Voltar para o início
				</a>
			</div>
		</div>
	);
}
