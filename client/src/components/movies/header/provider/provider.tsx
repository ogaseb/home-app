import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import { useMediaQuery } from "react-responsive";
import {
	showTmdbShowsResults,
	showUserShowsResults,
} from "@stores/ui_store/ui_store";
import { setSearchShows } from "@stores/shows_store/user_shows/user_shows";

const ButtonGroupWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;

	${mediaQuery("largeHandset")`
		justify-content: start;
		margin-bottom: 4px;

		& .MuiToggleButtonGroup-root > button {
			font-size: 12px;
		}
	`}
`;

const ButtonGroupWrapperResults = styled(ButtonGroupWrapper)`
	justify-content: center;
	${mediaQuery("largeHandset")`
		flex: 50%;
		justify-content: start;
	`}
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
	&& {
		.MuiToggleButton-root {
			color: #1976d2;
			border: 1px solid rgba(25, 118, 210, 0.5);
			border-radius: 4px;
			height: 32px;
			line-height: 12px;
			font-size: 12px;
			transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		}

		.MuiToggleButton-root:hover {
			border: 1px solid #1976d2;
		}

		.MuiToggleButtonGroup-grouped:not(:first-of-type).Mui-selected {
			border-left: 1px solid #1976d2;
		}

		.MuiToggleButtonGroup-grouped:not(
				:first-of-type
			).Mui-disabled.Mui-selected {
			border-left: 1px solid rgba(122, 122, 122, 0.5);
		}

		.Mui-selected {
			border: 1px solid #1976d2;
			background-color: rgb(33, 33, 33);
		}

		.Mui-disabled {
			border: 1px solid rgba(122, 122, 122, 0.5);
			color: rgba(122, 122, 122, 0.5);
		}
	}
`;

const MoviesHeaderProvider = () => {
	const dispatch = useAppDispatch();
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	const isMobile = useMediaQuery({
		query: "(max-width: 480px)",
	});

	return (
		<ButtonGroupWrapperResults>
			<StyledToggleButtonGroup
				value={whichShowsResultsToShow}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<ToggleButton
					value="tmdb"
					onClick={() => {
						dispatch(showTmdbShowsResults());
						dispatch(setSearchShows([]));
					}}
				>
					TMDB
				</ToggleButton>
				<ToggleButton
					value="user"
					onClick={() => {
						dispatch(showUserShowsResults());
						dispatch(setSearchShows([]));
					}}
				>
					User
				</ToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapperResults>
	);
};

export { MoviesHeaderProvider };
