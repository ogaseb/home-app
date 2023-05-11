import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { changeCurrentCategory } from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { useEffect } from "react";
import styled from "styled-components";
import { mediaQuery, screens } from "@theme/theme";
import { MoviesActions } from "@pages/shows_page/actions/actions";
import { MoviesList } from "@pages/shows_page/list/list";
import { MoviesPagination } from "@pages/shows_page/pagination/pagination";
import { Drawer, IconButton, Toolbar } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { toggleShowsMenuDrawer } from "@stores/ui_store/ui_store";
import CloseIcon from "@mui/icons-material/Close";

const Wrapper = styled.div`
	width: 100%;
`;

const MoviesContentWrapper = styled.div`
	margin-left: 241px;

	${mediaQuery("largeTablet")`
		margin-left: 0;
	`}
`;

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

const ShowsPage = () => {
	const dispatch = useAppDispatch();
	const {
		loading: showsLoading,
		shows: { results },
	} = useAppSelector((state) => state.showsStore.tmdbShows);
	const { whichShowsResultsToShow, showsMenuDrawer } = useAppSelector(
		(state) => state.uiStore,
	);

	const isTablet = useMediaQuery({
		query: `(max-width: ${screens.largeTablet}px)`,
	});

	useEffect(() => {
		if (showsLoading === "idle") {
			dispatch(changeCurrentCategory("popular"));
		}
	}, [showsLoading, results]);

	const handleOpenDrawer = () => {
		dispatch(toggleShowsMenuDrawer());
	};

	const drawer = (
		<>
			<Toolbar style={{ minHeight: "64px" }}>
				<IconButton
					color="primary"
					aria-label="open drawer"
					onClick={handleOpenDrawer}
					edge="start"
				>
					<CloseIcon />
				</IconButton>
			</Toolbar>
			<MoviesActions />
		</>
	);

	const handleDrawerToggle = () => {
		dispatch(toggleShowsMenuDrawer());
	};

	return (
		<Wrapper>
			<DrawerWrapper>
				{isTablet ? (
					<StyledDrawer
						variant="temporary"
						open={showsMenuDrawer}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</StyledDrawer>
				) : (
					<Drawer
						ModalProps={{
							keepMounted: true,
						}}
						variant="permanent"
						open={false}
					>
						{drawer}
					</Drawer>
				)}
			</DrawerWrapper>
			<MoviesContentWrapper>
				<MoviesList />
				{whichShowsResultsToShow === "tmdb" && <MoviesPagination />}
			</MoviesContentWrapper>
		</Wrapper>
	);
};

export default ShowsPage;
