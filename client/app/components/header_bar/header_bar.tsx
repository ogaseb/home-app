import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { checkIfLoggedIn, removeUser } from "@stores/user_store/user_store";

const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${(props) => props.theme.colors.primary};
	}
`;

const HeaderBar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(checkIfLoggedIn);

	const handleLogout = async () => {
		try {
			dispatch(removeUser());
			googleLogout();
		} catch (e) {
			/* empty */
		}
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
