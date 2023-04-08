import TestComponents from "@pages/shopping/shopping";
import Root from "@pages/root/root";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/shopping",
				element: <TestComponents />,
			},
			{
				path: "/movies",
				element: <TestComponents />,
			},
			{
				path: "/anime",
				element: <TestComponents />,
			},
		],
	},
]);

export { router };
