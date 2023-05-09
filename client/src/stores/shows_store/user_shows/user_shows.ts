import {
	createAsyncThunk,
	createSelector,
	createSlice,
	isAnyOf,
} from "@reduxjs/toolkit";
import { TShowsResultUser, TShowsStoreStateUser } from "./user_shows.types";
import { logOut } from "@stores/user_store/user_store";
import axios from "axios";

const initialState: TShowsStoreStateUser = {
	shows: {
		results: [],
	},
	searchShows: [],
	loading: "idle",
};

const toggleAddUserShow = createAsyncThunk(
	"user/toggleAddUserShow",
	async ({ show }: { show: TShowsResultUser }, { dispatch }) => {
		try {
			const {
				data: { show: showResponse },
			} = await axios.post("shows/add", {
				show,
			});

			return showResponse;
		} catch (error) {
			dispatch(logOut());
			throw {
				name: "Unauthorized",
				message: "Could not authenticate",
				code: "401",
			};
		}
	},
);

const toggleWatchedUserShow = createAsyncThunk(
	"user/toggleWatchedUserShow",
	async ({ show }: { show: TShowsResultUser }, { dispatch }) => {
		try {
			const {
				data: { show: showResponse },
			} = await axios.post("shows/watched", {
				show,
			});

			return showResponse;
		} catch (error) {
			dispatch(logOut());
			throw {
				name: "Unauthorized",
				message: "Could not authenticate",
				code: "401",
			};
		}
	},
);

const getAllUserShows = createAsyncThunk("user/getAllUserShows", async () => {
	try {
		const {
			data: { shows },
		} = await axios.get("shows/all");

		return shows;
	} catch (error) {
		throw { name: "Not found", message: "Show not found", code: "404" };
	}
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
	userShowsArray,
	selectedCurrentMediaType,
};

export const { setSearchShows } = userShows.actions;

export default userShows.reducer;
