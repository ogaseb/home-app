import { useAuthUser } from "@hooks/auth_user";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();

	const { isLoggedIn } = useAuthUser();

	if (!isLoggedIn) {
		navigate("/login");
	}

	return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>;
};
