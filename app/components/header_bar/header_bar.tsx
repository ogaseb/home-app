import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "@hooks/hooks";
import { toggleMenuDrawer } from "@stores/ui_store/ui_store";
import MenuDrawer from "@components/menu_drawer/menu_drawer";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${(props) => props.theme.colors.primary};
	}
`;

const HeaderBar = () => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<StyledAppBar position="sticky">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => dispatch(toggleMenuDrawer())}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Home App
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</StyledAppBar>
			<MenuDrawer />
		</div>
	);
};

export { HeaderBar };
