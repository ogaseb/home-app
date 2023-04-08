import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { toggleMenuDrawer } from "@stores/ui_store/ui_store";
import { useNavigate } from "react-router-dom";

const MenuDrawer = () => {
	const dispatch = useAppDispatch();
	const { menuDrawerState } = useAppSelector((state) => state.ui);

	const navigate = useNavigate();

	return (
		<Drawer
			anchor={"left"}
			open={menuDrawerState}
			onClose={() => dispatch(toggleMenuDrawer())}
		>
			<List>
				{["Shopping", "Movies", "Anime"].map((text, index) => (
					<ListItem
						key={text}
						onClick={() => navigate(`/${text.toLowerCase()}`)}
					>
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default MenuDrawer;
