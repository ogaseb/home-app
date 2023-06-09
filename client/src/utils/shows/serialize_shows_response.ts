import { TShowsResponseTMDB } from "@stores/shows_store/tmdb_shows/tmdb_shows.types";

type TTMDBResponse = {
	page: number;
	total_pages: number;
	results: {
		media_type: "tv" | "person" | "movie";
		title: string;
		name: string;
		id: number;
		poster_path: string;
		original_title: string;
		original_name: string;
		release_date: string;
		first_air_date: string;
		vote_average: number;
		overview: string;
	}[];
};

const serializeShowsResponse = (data: TTMDBResponse): TShowsResponseTMDB => {
	const serializedResults = data.results
		.filter((result) => result.media_type !== "person")
		.map((result) => ({
			title: result.title || result.name,
			originalTitle: result.original_title || result.original_name,
			showId: result.id,
			posterPath: result.poster_path,
			releaseDate: result.release_date || result.first_air_date,
			overview: result.overview,
			voteAverage: result.vote_average,
			mediaType: result.media_type,
			isWatched: false,
			isAdded: false,
			id: result.id,
		}));

	const serializedData: TShowsResponseTMDB = {
		page: data.page,
		totalPages: data.total_pages,
		results: serializedResults,
	};

	return serializedData;
};

export { serializeShowsResponse, TTMDBResponse };
