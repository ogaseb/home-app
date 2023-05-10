type TShowsResultUser = {
	title: string;
	originalTitle: string;
	id: number;
	posterPath: string;
	voteAverage: number;
	releaseDate: string;
	overview: string;
	isWatched: boolean;
	isAdded: boolean;
	showId: number;
	mediaType: "movie" | "tv" | "person";
};

type TShowsResponseUser = {
	results: TShowsResultUser[];
};

type TShowsStoreStateUser = {
	searchShows: TShowsResponseUser[];
};

export { TShowsResultUser, TShowsResponseUser, TShowsStoreStateUser };
