import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import {
	changeCurrentMediaType,
	changeCurrentCategory,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { useMediaQuery } from "react-responsive";
import { StyledToggleButtonGroup } from "../styles/toggle_button_group.styled";
import { ButtonGroupWrapper } from "../styles/button_group_wrapper.styled";
import { StyledToggleButton } from "../styles/toggle_button.styled";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { screens } from "@theme/theme";
import { hideShowsMenuDrawer } from "@stores/ui_store/ui_store";

const StyledTypography = styled(Typography)`
	&& {
		color: white;
	}
`;

const MoviesHeaderMediaType = () => {
	const dispatch = useAppDispatch();
	const { currentMediaType, currentCategory } = useAppSelector(
		(state) => state.showsStore.tmdbShows,
	);

	const onSectionChange = (
		_event: React.MouseEvent<HTMLElement>,
		newSection: "movie" | "tv",
	) => {
		dispatch(changeCurrentMediaType(newSection));

		if (newSection === "movie") {
			currentCategory === "on_the_air" &&
				dispatch(changeCurrentCategory("now_playing"));
			currentCategory === "airing_today" &&
				dispatch(changeCurrentCategory("upcoming"));
		}

		if (newSection === "tv") {
			currentCategory === "now_playing" &&
				dispatch(changeCurrentCategory("on_the_air"));
			currentCategory === "upcoming" &&
				dispatch(changeCurrentCategory("airing_today"));
		}

		return dispatch(hideShowsMenuDrawer());
	};

	const isMobile = useMediaQuery({
		query: `(max-width: ${screens.largeHandset}px)`,
	});

	return (
		<ButtonGroupWrapper>
			<StyledTypography>Media type</StyledTypography>
			<StyledToggleButtonGroup
				value={currentMediaType}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<StyledToggleButton
					value="movie"
					onClick={(event, value) => onSectionChange(event, value)}
				>
					Movies
				</StyledToggleButton>
				<StyledToggleButton
					value="tv"
					onClick={(event, value) => onSectionChange(event, value)}
				>
					Anime/Tv
				</StyledToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapper>
	);
};

export { MoviesHeaderMediaType };
