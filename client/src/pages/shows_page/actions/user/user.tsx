import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { useMediaQuery } from "react-responsive";
import {
	hideShowsMenuDrawer,
	showUserAddedResults,
	showUserWatchedResults, 
	showUserBothResults
} from "@stores/ui_store/ui_store";
import { setSearchShows } from "@stores/shows_store/user_shows/user_shows";
import { ButtonGroupWrapper } from "../styles/button_group_wrapper.styled";
import { StyledToggleButtonGroup } from "../styles/toggle_button_group.styled";
import { StyledToggleButton } from "../styles/toggle_button.styled";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { screens } from "@theme/theme";

const StyledTypography = styled(Typography)`
	&& {
		color: white;
	}
`;

const MoviesHeaderUser = () => {
	const dispatch = useAppDispatch();
	const { whichShowsUserToShow, whichShowsResultsToShow,    } = useAppSelector((state) => state.uiStore);

	const isMobile = useMediaQuery({
		query: `(max-width: ${screens.largeHandset}px)`,
	});

	return (
		<ButtonGroupWrapper>
			<StyledTypography>Saved</StyledTypography>
			<StyledToggleButtonGroup
				value={whichShowsUserToShow}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<StyledToggleButton
					disabled={whichShowsResultsToShow === "tmdb"}
					value="added"
					onClick={() => {
						dispatch(showUserAddedResults());
						dispatch(setSearchShows([]));
						dispatch(hideShowsMenuDrawer());
					}}
				>
					Added
				</StyledToggleButton>
				<StyledToggleButton
					disabled={whichShowsResultsToShow === "tmdb"}
					value="watched"
					onClick={() => {
						dispatch(showUserWatchedResults());
						dispatch(setSearchShows([]));
						dispatch(hideShowsMenuDrawer());
					}}
				>
					Watched
				</StyledToggleButton>
				<StyledToggleButton
					disabled={whichShowsResultsToShow === "tmdb"}
					value={null}
					onClick={() => {
						dispatch(showUserBothResults());
						dispatch(setSearchShows([]));
						dispatch(hideShowsMenuDrawer());
					}}
				>
					Both
				</StyledToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapper>
	);
};

export { MoviesHeaderUser };
