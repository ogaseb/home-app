import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_URL = "https://api.themoviedb.org/3";

interface IMoviesStoreTypes {
	search: unknown;
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IMoviesStoreTypes = {
	search: [],
	loading: "idle",
};

const searchByQuery = createAsyncThunk(
	"movies/searchByQuery",
	async (data: { query: string; page: number }) => {
		const { query, page } = data;

		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`,
		);

		return moviesResponse.data;
	},
);

const showTopRated = createAsyncThunk(
	"movies/showTopRated",
	async (page: number) => {
		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`,
		);

		return moviesResponse.data;
	},
);

const showPopular = createAsyncThunk(
	"movies/showPopular",
	async (page: number) => {
		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&language=en-US`,
		);

		return moviesResponse.data;
	},
);

export const moviesStore = createSlice({
	name: "moviesStore",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(searchByQuery.pending, (state, action) => {
			console.log(action.payload);
			state.loading = "pending";
		});
		builder.addCase(searchByQuery.fulfilled, (state, action) => {
			state.search = action.payload.results;
			state.loading = "succeeded";
		});

		builder.addCase(showTopRated.pending, (state, action) => {
			console.log(action.payload);
			state.loading = "pending";
		});
		builder.addCase(showTopRated.fulfilled, (state, action) => {
			state.search = action.payload.results;
			state.loading = "succeeded";
		});

		builder.addCase(showPopular.pending, (state, action) => {
			console.log(action.payload);
			state.loading = "pending";
		});
		builder.addCase(showPopular.fulfilled, (state, action) => {
			state.search = action.payload.results;
			state.loading = "succeeded";
		});
	},
});

export { searchByQuery, showPopular, showTopRated };

export default moviesStore.reducer;
