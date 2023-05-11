type TShowsResultTMDB = {
	title: string;
	originalTitle: string;
	showId: number;
	id: number;
	posterPath: string;
	voteAverage: number;
	releaseDate: string;
	overview: string;
	isAdded: boolean;
	isWatched: boolean;
	mediaType: "movie" | "tv" | "person";
};

type TShowsResponseTMDB = {
	page: number;
	totalPages: number;
	results: TShowsResultTMDB[];
};

type TSerializeShowsResults = {
	title?: string;
	original_title?: string;
	name?: string;
	original_name?: string;
	id: number;
	poster_path: string;
	vote_average: number;
	release_date?: string;
	first_air_date?: string;
	overview: string;
	media_type: "movie" | "tv" | "person";
};

type TShowsStoreState = {
	shows: TShowsResponseTMDB;
	loading: "idle" | "pending" | "succeeded" | "failed";
	currentMediaType: "movie" | "tv";
	latestShowId: number;
	lastSearchedMovie: string;
	currentCategory:
		| "search"
		| "popular"
		| "top_rated"
		| "upcoming"
		| "now_playing"
		| "airing_today"
		| "on_the_air"
		| "recommendations"
		| "similar";
};

export {
	TShowsResultTMDB,
	TShowsResponseTMDB,
	TSerializeShowsResults,
	TShowsStoreState,
};
