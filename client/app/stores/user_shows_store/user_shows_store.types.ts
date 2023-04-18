type TShowsResult = {
	title: string;
	originalTitle: string;
	id: number;
	posterPath: string;
	voteAverage: number;
	releaseDate: string;
	overview: string;
	mediaType: "movie" | "tv" | "person";
};

type TShowsResponse = {
	page: number;
	totalPages: number;
	results: TShowsResult[];
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
	shows: TShowsResponse;
	loading: "idle" | "pending" | "succeeded" | "failed";
};

export {
	TShowsResult,
	TShowsResponse,
	TSerializeShowsResults,
	TShowsStoreState,
};
