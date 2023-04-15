import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "@pages/root_page/root_page";
import { MainPage } from "@pages/main_page/main_page";

import TestComponents from "@pages/shopping_list_page/shopping_list_page";
import ShowsPage from "@pages/shows_page/shows_page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		children: [
			{
				path: "/",
				element: <MainPage />,
			},
			{
				path: "/shopping",
				element: <TestComponents />,
			},
			{
				path: "/shows",
				element: <ShowsPage />,
			},
			{
				path: "/anime",
				element: <TestComponents />,
			},
			{
				path: "/others",
				element: <TestComponents />,
			},
		],
	},
]);

export { router };
