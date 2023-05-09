import { HeaderBar } from "@components/header_bar/header_bar";
import { SnackbarAlert } from "@components/snackbar_alert/snackbar_alert";
import { useAppDispatch } from "@hooks/hooks";
import { signIn } from "@stores/user_store/user_store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const RootPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const accessToken = localStorage.getItem("user");

		if (accessToken) {
			dispatch(signIn(JSON.parse(accessToken)));
			location.pathname === "/login"
				? navigate("/")
				: navigate(location.pathname);
		} else {
			navigate("/login");
			return;
		}
	}, []);

	return (
		<>
			<Helmet>
				<title>Furry Hideout</title>
			</Helmet>
			<HeaderBar />
			<SnackbarAlert />
			<Outlet />
		</>
	);
};

export { RootPage };
