import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { TShowsResult, TShowsStoreState } from "./user_shows.types";

const initialState: TShowsStoreState = {
	shows: {
		page: 1,
		totalPages: 0,
		results: [],
	},
	loading: "idle",
};

const addUserShow = createAsyncThunk(
	"user/addUserShow",
	async ({ show }: { show: TShowsResult }) => {
		const {
			data: { show: showResponse },
		} = await axios.post(`${process.env.REACT_APP_API_URL}/shows/add`, {
			show,
		});

		return showResponse;
	},
);

const getAllUserShows = createAsyncThunk("user/getAllUserShows", async () => {
	const {
		data: { user },
	} = await axios.get(`${process.env.REACT_APP_API_URL}/shows/all`);

	return user;
});

export const userShowsStore = createSlice({
	name: "userShows",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addUserShow.fulfilled, (state, action) => {
			console.log(action.payload);
		});

		builder.addCase(getAllUserShows.fulfilled, (state, action) => {
			console.log(action.payload);
			state.loading = "succeeded";
			state.shows = action.payload;
		});

		builder.addMatcher(
			isAnyOf(addUserShow.pending, getAllUserShows.pending),
			(state) => {
				state.loading = "pending";
			},
		);

		builder.addMatcher(
			isAnyOf(addUserShow.pending, getAllUserShows.rejected),
			(state) => {
				state.loading = "failed";
			},
		);
	},
});

export { addUserShow, getAllUserShows };

// export const {} = userShowsStore.actions;

export default userShowsStore.reducer;
