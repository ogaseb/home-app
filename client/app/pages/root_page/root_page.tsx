import { HeaderBar } from "@components/header_bar/header_bar";
import { SnackbarAlert } from "@components/snackbar_alert/snackbar_alert";
import { useAppDispatch } from "@hooks/hooks";
import { signIn } from "@stores/user_store/user_store";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const OutletWrapper = styled.div`
	margin: 16px 16px 0;
`;

const RootPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const accessToken = localStorage.getItem("user");

		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${accessToken?.replace(/"/g, "")}`;

		if (accessToken) {
			dispatch(signIn(JSON.parse(accessToken)));
			navigate(location.pathname);
		} else {
			navigate("/login");
			return;
		}
	}, []);

	return (
		<>
			<HeaderBar />
			<SnackbarAlert />
			<OutletWrapper>
				<Outlet />
			</OutletWrapper>
		</>
	);
};

export { RootPage };
