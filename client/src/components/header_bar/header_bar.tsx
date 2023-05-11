import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useAppDispatch } from "@hooks/hooks";
import { logOut } from "@stores/auth_store/auth_store";
import { showAlert, toggleShowsMenuDrawer } from "@stores/ui_store/ui_store";
import { CustomBreadcrumbs } from "@components/breadcrumbs/breadcrumbs";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "react-responsive";
import { screens } from "@theme/theme";
import { useAuthUser } from "@hooks/auth_user";

const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${(props) => props.theme.colors.primary};
		height: ${(props) => props.theme.appBarHeight};
		border-bottom: 1px solid ${(props) => props.theme.colors.tertiary};
		box-shadow: none;
		.MuiToolbar-root {
			min-height: ${(props) => props.theme.appBarHeight};
			font-size: 14px;
		}
	}
`;

const HeaderBar = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAuthUser();

	const handleLogout = async () => {
		dispatch(logOut());
		dispatch(showAlert({ message: "See you soon!", severity: "success" }));
		googleLogout();
	};

	const handleOpenDrawer = () => {
		dispatch(toggleShowsMenuDrawer());
	};

	const isTablet = useMediaQuery({
		query: `(max-width: ${screens.largeTablet}px)`,
	});

	return (
		<div>
			<StyledAppBar position="sticky">
				<Toolbar>
					{location.pathname === "/shows" && isTablet && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleOpenDrawer}
							edge="start"
						>
							<MenuIcon />
						</IconButton>
					)}
					{location.pathname !== "/" && isLoggedIn && <CustomBreadcrumbs />}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					></Typography>
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
