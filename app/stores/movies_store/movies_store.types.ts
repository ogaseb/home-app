type TMoviesResult = {
	title: string;
	originalTitle: string;
	id: number;
	posterPath: string;
	voteAverage: number;
	releaseDate: string;
	overview: string;
};

type TMoviesResponse = {
	page: number;
	totalPages: number;
	results: TMoviesResult[];
};

type TSerializeMoviesResults = {
	title: string;
	original_title: string;
	id: number;
	poster_path: string;
	vote_average: number;
	release_date: string;
	overview: string;
};

type TMoviesStoreState = {
	movies: TMoviesResponse;
	loading: "idle" | "pending" | "succeeded" | "failed";
	currentCategory: "popular" | "top_rated" | "search";
};

export {
	TMoviesResponse,
	TSerializeMoviesResults,
	TMoviesStoreState,
	TMoviesResult,
};
