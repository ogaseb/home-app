import { useAppSelector } from "@hooks/hooks";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfLoggedIn } from "@stores/user_store/user_store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();
	const isLoggedIn = useAppSelector(checkIfLoggedIn);
	const checkUserToken = () => {
		if (!isLoggedIn) {
			return navigate("/login");
		}
	};
	useEffect(() => {
		checkUserToken();
	}, [isLoggedIn]);

	return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>;
};
