import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import styled from "styled-components";
import { Drawer, IconButton, Toolbar } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { toggleShowsMenuDrawer } from "@stores/ui_store/ui_store";
import CloseIcon from "@mui/icons-material/Close";
import { screens } from "@theme/theme";
import { MoviesActions } from "@pages/shows_page/actions/actions";

const DrawerWrapper = styled.div`
	background-color: #1c1d21;
	position: sticky;
	top: 0;
	bottom: 0;

	&& {
		& > .MuiDrawer-root > div {
			width: 240px;
			background-color: #1c1d21;
			border-right: 1px solid #33343a;
		}
	}
`;

const StyledDrawer = styled(Drawer)`
	&& {
		& > .MuiPaper-root {
			width: 100%;
			background-color: #1c1d21;
			top: 0;
			bottom: 0;
		}
	}
`;

const ShowsDrawer = () => {
	const dispatch = useAppDispatch();
	const { showsMenuDrawer } = useAppSelector((state) => state.uiStore);

	const isTablet = useMediaQuery({
		query: `(max-width: ${screens.largeTablet}px)`,
	});

	const handleDrawerToggle = () => {
		dispatch(toggleShowsMenuDrawer());
	};

	const drawer = (
		<>
			<Toolbar style={{ minHeight: "64px" }}>
				<IconButton
					color="primary"
					aria-label="open drawer"
					onClick={handleDrawerToggle}
					edge="start"
				>
					<CloseIcon />
				</IconButton>
			</Toolbar>
			<MoviesActions />
		</>
	);

	return (
		<DrawerWrapper>
			{isTablet ? (
				<StyledDrawer
					variant="temporary"
					open={showsMenuDrawer}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</StyledDrawer>
			) : (
				<Drawer
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					variant="permanent"
					open={false}
				>
					{drawer}
				</Drawer>
			)}
		</DrawerWrapper>
	);
};

export { ShowsDrawer };
