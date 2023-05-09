import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import styled from "styled-components";
import { Button } from "@mui/material";
import { mediaQuery, screens } from "@theme/theme";
import {
	getRecommendationByShowId,
	getSimilarByShowId,
	setLatestShowId,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { useMediaQuery } from "react-responsive";
import {
	getAllUserShows,
	toggleAddUserShow,
	toggleWatchedUserShow,
} from "@stores/shows_store/user_shows/user_shows";
import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";
import { ProgressSpinner } from "@components/progress/progress";
import { showAlert, showTmdbShowsResults } from "@stores/ui_store/ui_store";

const ButtonWrapper = styled.div`
	&& {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex: 2;

		.MuiButtonBase-root {
			width: 80%;
			font-size: 12px;
			line-height: 24px;
		}

		${mediaQuery("largeHandset")`
    margin: 12px 0 0 0;
		flex-basis: 100%;
		flex-direction: row;
		line-height: 10px;
		font-size: 10px;

		& .MuiButton-root {
			font-size: 10px;
		}
	`}
	}
`;

const MoviesListActionButtons = ({ show }: { show: TShowsResultUser }) => {
	const dispatch = useAppDispatch();

	const isMobile = useMediaQuery({
		query: `(max-width: ${screens.largeHandset}px)`,
	});

	const handleAddShow = async (show: TShowsResultUser) => {
		try {
			await dispatch(toggleAddUserShow({ show }));
			await dispatch(getAllUserShows());
			const messageString = `${show.isAdded ? "Removed" : "Added"} show ${
				show.isAdded ? "from" : "to"
			} list.`;
			dispatch(showAlert({ message: messageString, severity: "success" }));
		} catch (error) {
			dispatch(showAlert({ message: "Error adding show", severity: "error" }));
		}
	};

	const handleWatchedShow = async (show: TShowsResultUser) => {
		try {
			await dispatch(toggleWatchedUserShow({ show }));
			await dispatch(getAllUserShows());
			const messageString = `${show.isWatched ? "Removed" : "Added"} show ${
				show.isWatched ? "from" : "to"
			} watched list.`;
			dispatch(
				showAlert({
					message: messageString,
					severity: "success",
				}),
			);
		} catch (error) {
			dispatch(showAlert({ message: "Error adding show", severity: "error" }));
		}
	};

	const { loading: userShowLoading } = useAppSelector(
		(state) => state.showsStore.userShows,
	);

	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	return (
		<ButtonWrapper>
			<Button
				variant="outlined"
				color={show.isAdded ? "success" : "primary"}
				disableRipple
				disabled={userShowLoading === "pending"}
				onClick={() => handleAddShow(show)}
			>
				{userShowLoading === "pending" ? (
					<ProgressSpinner />
				) : show.isAdded ? (
					"Remove"
				) : (
					"Add"
				)}
			</Button>
			<Button
				variant="outlined"
				disableRipple
				color={show.isWatched ? "warning" : "primary"}
				onClick={() => handleWatchedShow(show)}
			>
				{userShowLoading === "pending" ? (
					<ProgressSpinner />
				) : show.isWatched ? (
					"Unwatch"
				) : (
					"Watched"
				)}
			</Button>
			<Button
				variant="outlined"
				disableRipple
				onClick={() => {
					if (whichShowsResultsToShow === "user") {
						dispatch(showTmdbShowsResults());
					}
					dispatch(setLatestShowId(show.id));
					dispatch(
						getRecommendationByShowId({
							id: show.id,
							mediaType: show.mediaType,
							page: 1,
						}),
					);
				}}
			>
				Recommend
			</Button>
			<Button
				disableRipple
				variant="outlined"
				onClick={() => {
					if (whichShowsResultsToShow === "user") {
						dispatch(showTmdbShowsResults());
					}
					dispatch(setLatestShowId(show.id));
					dispatch(
						getSimilarByShowId({
							id: show.id,
							mediaType: show.mediaType,
							page: 1,
						}),
					);
				}}
			>
				Similar
			</Button>
		</ButtonWrapper>
	);
};

export { MoviesListActionButtons };
