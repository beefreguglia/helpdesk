import { Route, Routes } from "react-router";

import { NotFound } from "../pages/not-found";

export function ClientRoutes() {
	return (
		<Routes>
			<Route path="/" element={<h1>hello world Client Layout</h1>}>
				<Route path="/" element={<h2>hello world Client</h2>} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
