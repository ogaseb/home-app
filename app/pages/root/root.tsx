import { HeaderBar } from "@components/header_bar/header_bar";
import { Outlet } from "react-router-dom";

export default function Root() {
	return (
		<>
			<HeaderBar />
			<Outlet />
		</>
	);
}
