import { combineReducers } from "@reduxjs/toolkit";
import userShows from "./user_shows/user_shows";
import tmdbShows from "./tmdb_shows/tmdb_shows";

const showsStore = combineReducers({
	userShows: userShows,
	tmdbShows: tmdbShows,
});

export default showsStore;
