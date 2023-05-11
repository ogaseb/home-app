import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TShowsResponseTMDB } from "@stores/shows_store/tmdb_shows/tmdb_shows.types";
import {
	TTMDBResponse,
	serializeShowsResponse,
} from "@utils/shows/serialize_shows_response";
const TMDB_API_URL = "https://api.themoviedb.org/3";

const baseQuery = fetchBaseQuery({
	baseUrl: `${TMDB_API_URL}/`,
});

const addMediaTypeToResults = async (
	data: TShowsResponseTMDB,
	currentMediaType: "movie" | "tv" | "person",
): Promise<TShowsResponseTMDB> => {
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

type TSearchResponse = { data: TShowsResponseTMDB; query: string };
type TSearchQuery = { search: string; page: number };

type TGetFromCategoryQuery = {
	currentMediaType: "tv" | "movie";
	currentCategory: string;
	page: number;
};

type TGetRecommendedOrSimilarQuery = {
	id: number;
	currentMediaType: "tv" | "movie";
	page: number;
	currentCategory: string;
};

export const TMDBShowsApi = createApi({
	reducerPath: "TMDBShowsApi",
	baseQuery: baseQuery,
	tagTypes: ["TMDBShows"],
	endpoints: (builder) => ({
		search: builder.query<TSearchResponse, TSearchQuery>({
			query: ({ search, page }) =>
				`search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}&page=${page}`,
			providesTags: ["TMDBShows"],
			transformResponse: (response: TTMDBResponse, _meta, arg) => {
				return { data: serializeShowsResponse(response), query: arg.search };
			},
		}),
		getFromCategory: builder.query<TShowsResponseTMDB, TGetFromCategoryQuery>({
			query: ({ currentMediaType, currentCategory, page }) =>
				`${currentMediaType}/${currentCategory}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`,
			providesTags: ["TMDBShows"],
			transformResponse: (response: TTMDBResponse, _meta, arg) => {
				return addMediaTypeToResults(
					serializeShowsResponse(response),
					arg.currentMediaType,
				);
			},
		}),
		getRecommendedOrSimilar: builder.query<
			TShowsResponseTMDB,
			TGetRecommendedOrSimilarQuery
		>({
			query: ({ id, currentMediaType, page, currentCategory }) =>
				`${currentMediaType}/${id}/${currentCategory}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`,
			providesTags: ["TMDBShows"],
			transformResponse: (response: TTMDBResponse, _meta, arg) => {
				return addMediaTypeToResults(
					serializeShowsResponse(response),
					arg.currentMediaType,
				);
			},
		}),
	}),
});

export const {
	useSearchQuery,
	useGetFromCategoryQuery,
	useGetRecommendedOrSimilarQuery,
} = TMDBShowsApi;
