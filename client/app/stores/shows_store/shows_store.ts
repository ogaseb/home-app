import { combineReducers, createSelector } from "@reduxjs/toolkit";
import userShows from "./user_shows/user_shows";
import tmdbShows from "./tmdb_shows/tmdb_shows";
import { TShowsResultTmdb } from "./tmdb_shows/tmdb_shows.types";
import { TShowsResultUser } from "./user_shows/user_shows.types";

const showsStore = combineReducers({
	userShows: userShows,
	tmdbShows: tmdbShows,
});

const userShowsSlice = (state: {
	showsStore: { userShows: { shows: { results: TShowsResultUser[] } } };
}) => state.showsStore.userShows.shows.results;

const tmdbShowsSlice = (state: {
	showsStore: { tmdbShows: { shows: { results: TShowsResultTmdb[] } } };
}) => state.showsStore.tmdbShows.shows.results;

const mergeShowsFromUserToTmdb = createSelector(
	userShowsSlice,
	tmdbShowsSlice,
	(userShowsArray, tmdbShowsArray) => {
		const updatedArray = tmdbShowsArray.map((show) => {
			const newItem = { ...show };
			const matchingId = userShowsArray.find(
				(elem) => elem.showId === show.showId,
			);
			if (matchingId) {
				newItem.isWatched = matchingId.isWatched;
				newItem.isAdded = matchingId.isAdded;
			}
			return newItem;
		});

		return updatedArray;
	},
);

export { mergeShowsFromUserToTmdb };

export default showsStore;
