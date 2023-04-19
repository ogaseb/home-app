import { combineReducers } from "@reduxjs/toolkit";
import userShowsStore from "./user_shows/user_shows";
import tmdbShowsStore from "./tmdb_shows/tmdb_shows";

const showsStore = combineReducers({
	userShows: userShowsStore,
	tmdbShows: tmdbShowsStore,
});

export default showsStore;
