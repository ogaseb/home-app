import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "@pages/root_page/root_page";
import { MainPage } from "@pages/main_page/main_page";
import { ProtectedRoute } from "@components/protected_route/protected_route";
import TestComponents from "@pages/shopping_list_page/shopping_list_page";
import ShowsPage from "@pages/shows_page/shows_page";
import LoginPage from "@pages/login_page/login_page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		children: [
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/",
				element: (
					<ProtectedRoute>
						<MainPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/shopping",
				element: (
					<ProtectedRoute>
						<TestComponents />
					</ProtectedRoute>
				),
			},
			{
				path: "/shows",
				element: (
					<ProtectedRoute>
						<ShowsPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/others",
				element: (
					<ProtectedRoute>
						<TestComponents />
					</ProtectedRoute>
				),
			},
		],
	},
]);

export { router };
