import {
	createAsyncThunk,
	createSelector,
	createSlice,
	isAnyOf,
} from "@reduxjs/toolkit";
import axios from "axios";
import { TShowsResultUser, TShowsStoreStateUser } from "./user_shows.types";
import { logOut } from "@stores/user_store/user_store";

const initialState: TShowsStoreStateUser = {
	shows: {
		results: [],
	},
	searchShows: [],
	loading: "idle",
};

const toggleAddUserShow = createAsyncThunk(
	"user/toggleAddUserShow",
	async ({ show }: { show: TShowsResultUser }) => {
		const {
			data: { show: showResponse },
		} = await axios.post(`${process.env.REACT_APP_API_URL}/shows/add`, {
			show,
		});

		return showResponse;
	},
);

const toggleWatchedUserShow = createAsyncThunk(
	"user/toggleWatchedUserShow",
	async ({ show }: { show: TShowsResultUser }) => {
		const {
			data: { show: showResponse },
		} = await axios.post(`${process.env.REACT_APP_API_URL}/shows/watched`, {
			show,
		});

		return showResponse;
	},
);

const getAllUserShows = createAsyncThunk("user/getAllUserShows", async () => {
	const {
		data: { shows },
	} = await axios.get(`${process.env.REACT_APP_API_URL}/shows/all`);

	return shows;
});

export const userShows = createSlice({
	name: "userShows",
	initialState,
	reducers: {
		setSearchShows: (state, action) => {
			state.searchShows = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllUserShows.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.shows.results = action.payload;
		});

		builder.addMatcher(
			isAnyOf(
				toggleAddUserShow.pending,
				getAllUserShows.pending,
				toggleWatchedUserShow.pending,
			),
			(state) => {
				state.loading = "pending";
			},
		);

		builder.addMatcher(
			isAnyOf(
				toggleAddUserShow.rejected,
				getAllUserShows.rejected,
				toggleWatchedUserShow.rejected,
			),
			(state) => {
				state.loading = "failed";
				logOut();
			},
		);
	},
});

const userShowsArray = (state: {
	showsStore: { userShows: { shows: { results: TShowsResultUser[] } } };
}) => state.showsStore.userShows.shows.results;

const selectedCurrentMediaType = (state: {
	showsStore: { tmdbShows: { currentMediaType: "movie" | "tv" } };
}) => state.showsStore.tmdbShows.currentMediaType;

const addedUserResults = createSelector(
	[userShowsArray, selectedCurrentMediaType],
	(userShowsArray, selectedCurrentMediaType) => {
		return userShowsArray
			.filter((show) => show.isAdded)
			.filter((show) => show.mediaType === selectedCurrentMediaType);
	},
);

export {
	toggleAddUserShow,
	toggleWatchedUserShow,
	getAllUserShows,
	addedUserResults,
};

export const { setSearchShows } = userShows.actions;

export default userShows.reducer;
