import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { useMediaQuery } from "react-responsive";
import {
	hideShowsMenuDrawer,
	showTmdbShowsResults,
	showUserShowsResults,
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

const MoviesHeaderProvider = () => {
	const dispatch = useAppDispatch();
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	const isMobile = useMediaQuery({
		query: `(max-width: ${screens.largeHandset}px)`,
	});

	return (
		<ButtonGroupWrapper>
			<StyledTypography>Source</StyledTypography>
			<StyledToggleButtonGroup
				value={whichShowsResultsToShow}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<StyledToggleButton
					value="tmdb"
					onClick={() => {
						dispatch(showTmdbShowsResults());
						dispatch(setSearchShows([]));
						dispatch(hideShowsMenuDrawer());
					}}
				>
					TMDB
				</StyledToggleButton>
				<StyledToggleButton
					value="user"
					onClick={() => {
						dispatch(showUserShowsResults());
						dispatch(setSearchShows([]));
						dispatch(hideShowsMenuDrawer());
					}}
				>
					User
				</StyledToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapper>
	);
};

export { MoviesHeaderProvider };
