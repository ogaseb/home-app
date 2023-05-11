import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "@pages/root_page/root_page";
import { MainPage } from "@pages/main_page/main_page";
import { ProtectedRoute } from "@navigation/protected_route/protected_route";
import ShoppingListPage from "@pages/shopping_page/shopping_list_page/shopping_list_page";
import ShowsPage from "@pages/shows_page/shows_page";
import LoginPage from "@pages/login_page/login_page";
import ShoppingPage from "@pages/shopping_page/shopping_page";

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
						<ShoppingPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/shopping/:id",
				element: (
					<ProtectedRoute>
						<ShoppingListPage />
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
						<ShoppingListPage />
					</ProtectedRoute>
				),
			},
		],
	},
]);

export { router };
