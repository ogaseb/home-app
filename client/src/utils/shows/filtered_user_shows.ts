import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";

const filteredUserShows = (
	shows: TShowsResultUser[],
	currentMediaType: string,
): TShowsResultUser[] => {
	const filteredShows = [...shows];
	return filteredShows.filter(
		(show) => show.isAdded && show.mediaType === currentMediaType,
	);
};

export { filteredUserShows };
