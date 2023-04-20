import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { checkIfLoggedIn, logOut } from "@stores/user_store/user_store";
import { showAlert } from "@stores/ui_store/ui_store";

const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${(props) => props.theme.colors.primary};
		height: 32px;

		.MuiToolbar-root {
			min-height: 32px;
			font-size: 14px;
		}
	}
`;

const HeaderBar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(checkIfLoggedIn);

	const { user } = useAppSelector((state) => state.userStore);

	const handleLogout = async () => {
		dispatch(logOut());
		dispatch(showAlert({ message: "See you soon!", severity: "success" }));
		googleLogout();
	};

	return (
		<div>
			<StyledAppBar position="sticky">
				<Toolbar>
					{location.pathname !== "/" && isLoggedIn && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => navigate(-1)}
						>
							<ArrowBack />
						</IconButton>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Furry Hideout App
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{user?.nickname}
					</Typography>
					{isLoggedIn && (
						<Button color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					)}
				</Toolbar>
			</StyledAppBar>
		</div>
	);
};

export { HeaderBar };
