import { HeaderBar } from "@components/header_bar/header_bar";
import { SnackbarAlert } from "@components/snackbar_alert/snackbar_alert";
import { Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuthUser } from "@hooks/auth_user";

const RootPage = () => {
	useAuthUser();
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Furry Hideout</title>
				</Helmet>
			</HelmetProvider>
			<HeaderBar />
			<SnackbarAlert />
			<Outlet />
		</>
	);
};

export { RootPage };
