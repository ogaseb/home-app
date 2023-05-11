import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import styled from "styled-components";
import { Button } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import {
	changeCurrentCategory,
	setLatestShowId,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";
import { ProgressSpinner } from "@components/progress/progress";
import { showAlert, showTmdbShowsResults } from "@stores/ui_store/ui_store";
import {
	useToggleAddUserShowMutation,
	useToggleWatchedUserShowMutation,
} from "@services/api/user_api/user_api";

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

	const [toggleAddUserShow, { isLoading: isAdding }] =
		useToggleAddUserShowMutation();
	const [toggleWatchedUserShow, { isLoading: isUpdating }] =
		useToggleWatchedUserShowMutation();

	const handleAddShow = async (show: TShowsResultUser) => {
		try {
			await toggleAddUserShow(show);
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
			await toggleWatchedUserShow(show);
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

	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	return (
		<ButtonWrapper>
			<Button
				variant="outlined"
				color={show.isAdded ? "success" : "primary"}
				disableRipple
				disabled={isAdding}
				onClick={() => handleAddShow(show)}
			>
				{isAdding ? <ProgressSpinner /> : show.isAdded ? "Remove" : "Add"}
			</Button>
			<Button
				variant="outlined"
				disableRipple
				disabled={isUpdating}
				color={show.isWatched ? "warning" : "primary"}
				onClick={() => handleWatchedShow(show)}
			>
				{isUpdating ? (
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
					dispatch(changeCurrentCategory("recommendations"));
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
					dispatch(changeCurrentCategory("similar"));
				}}
			>
				Similar
			</Button>
		</ButtonWrapper>
	);
};

export { MoviesListActionButtons };
