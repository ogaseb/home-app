import {
	TMoviesResponse,
	TSerializeMoviesResults,
} from "@stores/movies_store/movies_store.types";

const serializeMoviesResponse = (data: any) => {
	const serialize: TMoviesResponse = {
		page: data.page,
		totalPages: data.total_pages,
		results: data.results.map((result: TSerializeMoviesResults) => ({
			title: result.title,
			originalTitle: result.original_title,
			id: result.id,
			posterPath: result.poster_path,
			releaseDate: result.release_date,
			overview: result.overview,
			voteAverage: result.vote_average,
		})),
	};

	return serialize;
};

export { serializeMoviesResponse };
