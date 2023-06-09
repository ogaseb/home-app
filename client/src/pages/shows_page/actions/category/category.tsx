import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { ButtonGroupWrapper } from "../styles/button_group_wrapper.styled";
import { StyledToggleButtonGroup } from "../styles/toggle_button_group.styled";
import { StyledToggleButton } from "../styles/toggle_button.styled";
import { screens } from "@theme/theme";
import { changeCurrentCategory } from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { hideShowsMenuDrawer } from "@stores/ui_store/ui_store";

const StyledTypography = styled(Typography)`
	&& {
		color: white;
	}
`;

const MoviesHeaderCategory = () => {
	const dispatch = useAppDispatch();
	const { currentCategory, currentMediaType } = useAppSelector(
		(state) => state.showsStore.tmdbShows,
	);
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	const isMobile = useMediaQuery({
		query: `(max-width: ${screens.largeHandset}px)`,
	});

	const onCategoryChange = (
		_event: React.MouseEvent<HTMLElement>,
		newCategory: string,
	) => {
		switch (newCategory) {
			case "popular":
				dispatch(changeCurrentCategory("popular"));
				break;
			case "top_rated":
				dispatch(changeCurrentCategory("top_rated"));
				break;
			case "upcoming":
				dispatch(changeCurrentCategory("upcoming"));
				break;
			case "now_playing":
				dispatch(changeCurrentCategory("now_playing"));
				break;
			case "airing_today":
				dispatch(changeCurrentCategory("airing_today"));
				break;
			case "on_the_air":
				dispatch(changeCurrentCategory("on_the_air"));
				break;
		}
		return dispatch(hideShowsMenuDrawer());
	};

	return (
		<ButtonGroupWrapper>
			<StyledTypography>Categories</StyledTypography>
			<StyledToggleButtonGroup
				disabled={whichShowsResultsToShow === "user"}
				value={currentCategory}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<StyledToggleButton
					value="popular"
					onClick={(event, value) => onCategoryChange(event, value)}
				>
					Popular
				</StyledToggleButton>
				<StyledToggleButton
					value="top_rated"
					onClick={(event, value) => onCategoryChange(event, value)}
				>
					Top Rated
				</StyledToggleButton>
			</StyledToggleButtonGroup>
			<StyledToggleButtonGroup
				disabled={whichShowsResultsToShow === "user"}
				value={currentCategory}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<StyledToggleButton
					value={currentMediaType === "tv" ? "on_the_air" : "now_playing"}
					onClick={(event, value) => onCategoryChange(event, value)}
				>
					Now Playing
				</StyledToggleButton>
				<StyledToggleButton
					value={currentMediaType === "tv" ? "airing_today" : "upcoming"}
					onClick={(event, value) => onCategoryChange(event, value)}
				>
					Upcoming
				</StyledToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapper>
	);
};

export { MoviesHeaderCategory };
