import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TMoviesResponse, TMoviesStoreState } from "./movies_store.types";
import { serializeMoviesResponse } from "@utils/movies/serialize_movie_response";

const TMDB_API_URL = "https://api.themoviedb.org/3";

const initialState: TMoviesStoreState = {
	movies: {
		page: 1,
		totalPages: 0,
		results: [],
	},
	currentCategory: "popular",
	loading: "idle",
};

const searchByQuery = createAsyncThunk(
	"movies/searchByQuery",
	async (data: { query: string; page: number }) => {
		const { query, page } = data;

		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`,
		);

		return serializeMoviesResponse(moviesResponse.data);
	},
);

const showTopRated = createAsyncThunk(
	"movies/showTopRated",
	async (page: number) => {
		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`,
		);

		return serializeMoviesResponse(moviesResponse.data);
	},
);

const showPopular = createAsyncThunk(
	"movies/showPopular",
	async (page: number) => {
		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&language=en-US`,
		);

		return serializeMoviesResponse(moviesResponse.data);
	},
);

const getRecommendationByMovieId = createAsyncThunk(
	"movies/getRecommendationByMovieId",
	async (data: { movieId: number; page: number }) => {
		const { movieId, page } = data;

		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&language=en-US`,
		);

		return serializeMoviesResponse(moviesResponse.data);
	},
);

const getSimilarByMovieId = createAsyncThunk(
	"movies/getSimilarByMovieId",
	async (data: { movieId: number; page: number }) => {
		const { movieId, page } = data;

		const moviesResponse = await axios.get(
			`${TMDB_API_URL}/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&language=en-US`,
		);

		return serializeMoviesResponse(moviesResponse.data);
	},
);

export const moviesStore = createSlice({
	name: "moviesStore",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(searchByQuery.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(
			searchByQuery.fulfilled,
			(state, action: { payload: TMoviesResponse }) => {
				state.movies = action.payload;
				state.loading = "succeeded";
				state.currentCategory = "search";
			},
		);

		builder.addCase(showTopRated.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(showTopRated.fulfilled, (state, action) => {
			state.movies.results = action.payload.results;
			state.loading = "succeeded";
			state.currentCategory = "top_rated";
		});

		builder.addCase(showPopular.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(
			showPopular.fulfilled,
			(state, action: { payload: TMoviesResponse }) => {
				state.movies = action.payload;
				state.loading = "succeeded";
				state.currentCategory = "popular";
			},
		);

		builder.addCase(getRecommendationByMovieId.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(getRecommendationByMovieId.fulfilled, (state, action) => {
			state.movies = action.payload;
			state.loading = "succeeded";
		});

		builder.addCase(getSimilarByMovieId.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(getSimilarByMovieId.fulfilled, (state, action) => {
			state.movies = action.payload;
			state.loading = "succeeded";
		});
	},
});

export {
	searchByQuery,
	showPopular,
	showTopRated,
	serializeMoviesResponse,
	getRecommendationByMovieId,
	getSimilarByMovieId,
};

export default moviesStore.reducer;
