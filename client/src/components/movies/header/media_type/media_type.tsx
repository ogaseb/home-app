import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import {
	getPopular,
	getTopRated,
	getUpcoming,
	getNowPlaying,
	changeCurrentMediaType,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import { useMediaQuery } from "react-responsive";

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

const ButtonGroupWrapperCategory = styled(ButtonGroupWrapper)`
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
		query: "(max-width: 480px)",
	});

	return (
		<ButtonGroupWrapperCategory>
			<StyledToggleButtonGroup
				value={currentMediaType}
				exclusive
				size={isMobile ? "small" : "medium"}
			>
				<ToggleButton
					value="movie"
					onClick={(event, value) => onSectionChange(event, value)}
				>
					Movies
				</ToggleButton>
				<ToggleButton
					value="tv"
					onClick={(event, value) => onSectionChange(event, value)}
				>
					Anime/Tv
				</ToggleButton>
			</StyledToggleButtonGroup>
		</ButtonGroupWrapperCategory>
	);
};

export { MoviesHeaderMediaType };
