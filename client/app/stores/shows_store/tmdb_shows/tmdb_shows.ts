import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
	isAnyOf,
} from "@reduxjs/toolkit";
import axios from "axios";
import { TShowsResponse, TShowsStoreState } from "./tmdb_shows.types";
import { serializeShowsResponse } from "@utils/shows/serialize_shows_response";
import { RootState } from "@stores/app_store/app_store";

const TMDB_API_URL = "https://api.themoviedb.org/3";

const initialState: TShowsStoreState = {
	shows: {
		page: 1,
		totalPages: 0,
		results: [],
	},
	latestShowId: 0,
	lastSearchedMovie: "",
	currentCategory: "popular",
	currentMediaType: "movie",
	loading: "idle",
};

const fetchMovies = async (endpoint: string) => {
	const moviesResponse = await axios.get(endpoint);

	return serializeShowsResponse(moviesResponse.data);
};

const addMediaTypeToResults = async (
	data: TShowsResponse,
	currentMediaType: "movie" | "tv" | "person",
): Promise<TShowsResponse> => {
	const updatedResults = data.results.map((show) => {
		return {
			...show,
			mediaType: currentMediaType,
		};
	});

	return {
		...data,
		results: updatedResults,
	};
};

const searchByQuery = createAsyncThunk(
	"tmdb/searchByQuery",
	async ({ query, page }: { query: string; page: number }) => {
		const endpoint = `${TMDB_API_URL}/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`;
		const data = await fetchMovies(endpoint);
		return { data, query };
	},
);

const getTopRated = createAsyncThunk(
	"tmdb/getTopRated",
	async ({ page }: { page: number }, { getState }) => {
		const { currentMediaType } = (getState() as RootState).showsStore
			.tmdbShows as TShowsStoreState;
		const endpoint = `${TMDB_API_URL}/${currentMediaType}/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`;
		const data = await fetchMovies(endpoint);

		return addMediaTypeToResults(data, currentMediaType);
	},
);

const getPopular = createAsyncThunk(
	"tmdb/getPopular",
	async ({ page }: { page: number }, { getState }) => {
		const { currentMediaType } = (getState() as RootState).showsStore
			.tmdbShows as TShowsStoreState;
		const endpoint = `${TMDB_API_URL}/${currentMediaType}/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&language=en-US`;
		const data = await fetchMovies(endpoint);
		return addMediaTypeToResults(data, currentMediaType);
	},
);

const getRecommendationByShowId = createAsyncThunk(
	"tmdb/getRecommendationByShowId",
	async (
		{
			id,
			page,
			mediaType,
		}: { id: number; mediaType: "movie" | "tv" | "person"; page: number },
		{ getState },
	) => {
		const { latestShowId } = (getState() as RootState).showsStore
			.tmdbShows as TShowsStoreState;

		const endpoint = `${TMDB_API_URL}/${mediaType}/${
			id || latestShowId
		}/recommendations?api_key=${
			process.env.REACT_APP_TMDB_API_KEY
		}&page=${page}&language=en-US`;
		const data = await fetchMovies(endpoint);
		return addMediaTypeToResults(data, mediaType);
	},
);

const getSimilarByShowId = createAsyncThunk(
	"tmdb/getSimilarByShowId",
	async (
		{
			id,
			page,
			mediaType,
		}: { id: number; mediaType: "movie" | "tv" | "person"; page: number },
		{ getState },
	) => {
		const { latestShowId } = (getState() as RootState).showsStore
			.tmdbShows as TShowsStoreState;

		const endpoint = `${TMDB_API_URL}/${mediaType}/${
			id || latestShowId
		}/similar?api_key=${
			process.env.REACT_APP_TMDB_API_KEY
		}&page=${page}&language=en-US`;
		const data = await fetchMovies(endpoint);
		return addMediaTypeToResults(data, mediaType);
	},
);

const getUpcoming = createAsyncThunk(
	"tmdb/getUpcoming",
	async ({ page }: { page: number }, { getState }) => {
		const { currentMediaType } = (getState() as RootState).showsStore
			.tmdbShows as TShowsStoreState;
		const endpoint = `${TMDB_API_URL}/${currentMediaType}/${
			currentMediaType === "movie" ? "upcoming" : "airing_today"
		}?api_key=${
			process.env.REACT_APP_TMDB_API_KEY
		}&page=${page}&language=en-US`;
		const data = await fetchMovies(endpoint);
		return data;
	},
);

const getNowPlaying = createAsyncThunk(
	"tmdb/getNowPlaying",
	async ({ page }: { page: number }, { getState }) => {
		const { currentMediaType } = (getState() as RootState).showsStore
			.tmdbShows as TShowsStoreState;
		const endpoint = `${TMDB_API_URL}/${currentMediaType}/${
			currentMediaType === "movie" ? "now_playing" : "on_the_air"
		}?api_key=${
			process.env.REACT_APP_TMDB_API_KEY
		}&page=${page}&language=en-US`;
		const data = await fetchMovies(endpoint);
		return data;
	},
);

export const tmdbShows = createSlice({
	name: "tmdbShows",
	initialState,
	reducers: {
		changeCurrentMediaType: (state, action: PayloadAction<"movie" | "tv">) => {
			state.currentMediaType = action.payload;
		},
		setLatestShowId: (state, action: PayloadAction<number>) => {
			state.latestShowId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchByQuery.fulfilled, (state, action) => {
			state.currentCategory = "search";
			state.shows = action.payload.data;
			state.lastSearchedMovie = action.payload.query;
			state.loading = "succeeded";
		});

		builder.addMatcher(
			isAnyOf(
				searchByQuery.pending,
				getTopRated.pending,
				getPopular.pending,
				getRecommendationByShowId.pending,
				getSimilarByShowId.pending,
				getUpcoming.pending,
				getNowPlaying.pending,
			),
			(state) => {
				state.loading = "pending";
			},
		);

		builder.addMatcher(
			isAnyOf(
				getTopRated.fulfilled,
				getPopular.fulfilled,
				getRecommendationByShowId.fulfilled,
				getSimilarByShowId.fulfilled,
				getUpcoming.fulfilled,
				getNowPlaying.fulfilled,
			),
			(state, action) => {
				state.loading = "succeeded";
				state.shows = action.payload;
				switch (action.type) {
					case getPopular.fulfilled.type:
						state.currentCategory = "popular";
						break;
					case getTopRated.fulfilled.type:
						state.currentCategory = "top_rated";
						break;
					case getUpcoming.fulfilled.type:
						state.currentCategory = "upcoming";
						break;
					case getNowPlaying.fulfilled.type:
						state.currentCategory = "now_playing";
						break;
					case getRecommendationByShowId.fulfilled.type:
						state.currentCategory = "recommendation";
						break;
					case getSimilarByShowId.fulfilled.type:
						state.currentCategory = "similar";
						break;
					default:
						break;
				}
			},
		);

		builder.addMatcher(
			isAnyOf(
				searchByQuery.rejected,
				getTopRated.rejected,
				getPopular.rejected,
				getRecommendationByShowId.rejected,
				getSimilarByShowId.rejected,
				getUpcoming.rejected,
				getNowPlaying.rejected,
			),
			(state) => {
				state.loading = "failed";
			},
		);
	},
});

export {
	searchByQuery,
	getPopular,
	getTopRated,
	getRecommendationByShowId,
	getSimilarByShowId,
	getUpcoming,
	getNowPlaying,
};

export const { changeCurrentMediaType, setLatestShowId } = tmdbShows.actions;

export default tmdbShows.reducer;
