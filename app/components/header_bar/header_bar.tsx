import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooks";
import { toggleMenuDrawer } from "@stores/ui_store/ui_store";
import MenuDrawer from "@components/menu_drawer/menu_drawer";

const HeaderBar = () => {
	const dispatch = useAppDispatch();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
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
			</AppBar>
			<MenuDrawer />
		</Box>
	);
};

export { HeaderBar };
