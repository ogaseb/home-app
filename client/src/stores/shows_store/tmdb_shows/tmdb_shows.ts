import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { TShowsStoreState } from "./tmdb_shows.types";
import { TMDBShowsApi } from "@services/api/TMDB_api/TMDB_api";

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

export const tmdbShows = createSlice({
	name: "tmdbShows",
	initialState,
	reducers: {
		changeCurrentMediaType: (state, action: PayloadAction<"movie" | "tv">) => {
			state.currentMediaType = action.payload;
		},
		changeCurrentCategory: (
			state,
			action: PayloadAction<
				| "search"
				| "popular"
				| "top_rated"
				| "upcoming"
				| "now_playing"
				| "airing_today"
				| "on_the_air"
				| "recommendations"
				| "similar"
			>,
		) => {
			state.currentCategory = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.shows.page = action.payload;
		},
		setLatestShowId: (state, action: PayloadAction<number>) => {
			state.latestShowId = action.payload;
		},
		setLatestSearchQuery: (state, action: PayloadAction<string>) => {
			state.lastSearchedMovie = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			TMDBShowsApi.endpoints.search.matchFulfilled,
			(state, action) => {
				state.currentCategory = "search";
				state.shows = action.payload.data;
				state.lastSearchedMovie = action.payload.query;
				state.loading = "succeeded";
			},
		);

		builder.addMatcher(
			isAnyOf(
				TMDBShowsApi.endpoints.getFromCategory.matchFulfilled,
				TMDBShowsApi.endpoints.getRecommendedOrSimilar.matchFulfilled,
			),
			(state, action) => {
				state.loading = "succeeded";
				state.shows = action.payload;
			},
		);

		builder.addMatcher(
			isAnyOf(
				TMDBShowsApi.endpoints.getFromCategory.matchRejected,
				TMDBShowsApi.endpoints.getRecommendedOrSimilar.matchRejected,
			),
			(state) => {
				state.loading = "failed";
			},
		);
	},
});

export { initialState };

export const {
	changeCurrentMediaType,
	setLatestShowId,
	setLatestSearchQuery,
	changeCurrentCategory,
	setCurrentPage,
} = tmdbShows.actions;

export default tmdbShows.reducer;
