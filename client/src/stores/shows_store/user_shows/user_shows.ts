import { createSlice } from "@reduxjs/toolkit";
import { TShowsStoreStateUser } from "./user_shows.types";

const initialState: TShowsStoreStateUser = {
	searchShows: [],
};

export const userShows = createSlice({
	name: "userShows",
	initialState,
	reducers: {
		setSearchShows: (state, action) => {
			state.searchShows = action.payload;
		},
	},
});

export const { setSearchShows } = userShows.actions;

export default userShows.reducer;
