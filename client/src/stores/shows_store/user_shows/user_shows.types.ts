type TShowsResultUser = {
	title: string;
	originalTitle: string;
	showId: number;
	id: number;
	posterPath: string;
	voteAverage: number;
	releaseDate: string;
	overview: string;
	isWatched: boolean;
	isAdded: boolean;
	mediaType: "movie" | "tv" | "person";
};

type TShowsStoreStateUser = {
	searchShows: TShowsResultUser[];
};

export { TShowsResultUser, TShowsStoreStateUser };
