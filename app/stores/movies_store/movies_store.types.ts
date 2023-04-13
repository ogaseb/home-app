type TMoviesResult = {
	title: string;
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
	id: number;
	poster_path: string;
	vote_average: number;
	release_date: string;
	overview: string;
};

type TMoviesStoreState = {
	movies: TMoviesResponse;
	loading: "idle" | "pending" | "succeeded" | "failed";
};

export {
	TMoviesResponse,
	TSerializeMoviesResults,
	TMoviesStoreState,
	TMoviesResult,
};
