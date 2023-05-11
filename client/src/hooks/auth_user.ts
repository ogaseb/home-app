import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { signIn } from "@stores/auth_store/auth_store";

export function useAuthUser() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.authStore);
	const accessToken = localStorage.getItem("user");

	useEffect(() => {
		if (accessToken) {
			dispatch(signIn(JSON.parse(accessToken)));
			location.pathname === "/login"
				? navigate("/")
				: navigate(location.pathname);
		} else {
			navigate("/login");
			return;
		}
	}, [accessToken]);

	const isLoggedIn = !!accessToken && !!user;

	return { isLoggedIn };
}
