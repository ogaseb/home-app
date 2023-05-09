import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import {
	getPopular,
	getTopRated,
	getUpcoming,
	getNowPlaying,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { ButtonGroupWrapper } from "../styles/button_group_wrapper.styled";
import { StyledToggleButtonGroup } from "../styles/toggle_button_group.styled";
import { StyledToggleButton } from "../styles/toggle_button.styled";
import { screens } from "@theme/theme";

const StyledTypography = styled(Typography)`
	&& {
		color: white;
	}
`;

const MoviesHeaderCategory = () => {
	const dispatch = useAppDispatch();
	const { currentCategory } = useAppSelector(
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
				dispatch(getPopular({ page: 1 }));
				break;
			case "top_rated":
				dispatch(getTopRated({ page: 1 }));
				break;
			case "upcoming":
				dispatch(getUpcoming({ page: 1 }));
				break;
			case "now_playing":
				dispatch(getNowPlaying({ page: 1 }));
				break;
		}
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
					value="now_playing"
					onClick={(event, value) => onCategoryChange(event, value)}
				>
					Now Playing
				</StyledToggleButton>
				<StyledToggleButton
					value="upcoming"
					onClick={(event, value) => onCategoryChange(event, value)}
				>
					Upcoming
				</StyledToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapper>
	);
};

export { MoviesHeaderCategory };
