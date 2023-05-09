import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import {
	getPopular,
	getTopRated,
	getUpcoming,
	getNowPlaying,
	changeCurrentMediaType,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { useMediaQuery } from "react-responsive";
import { StyledToggleButtonGroup } from "../styles/toggle_button_group.styled";
import { ButtonGroupWrapper } from "../styles/button_group_wrapper.styled";
import { StyledToggleButton } from "../styles/toggle_button.styled";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { screens } from "@theme/theme";

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
		switch (currentCategory) {
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
