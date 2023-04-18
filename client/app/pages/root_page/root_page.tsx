import { HeaderBar } from "@components/header_bar/header_bar";
import { useAppDispatch } from "@hooks/hooks";
import { signIn } from "@stores/user_store/user_store";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const OutletWrapper = styled.div`
	margin: 16px 16px 0;
`;

const RootPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const accessToken = localStorage.getItem("user");

		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${accessToken?.replace(/"/g, "")}`;

		if (accessToken) {
			dispatch(signIn(JSON.parse(accessToken)));
			navigate("/");
		}
	}, []);

	return (
		<>
			<HeaderBar />
			<OutletWrapper>
				<Outlet />
			</OutletWrapper>
		</>
	);
};

export { RootPage };
