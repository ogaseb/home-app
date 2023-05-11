import { TShowsResultTMDB } from "@stores/shows_store/tmdb_shows/tmdb_shows.types";
import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";

const mergeShowsFromUserToTmdb = (
	userShows: TShowsResultUser[],
	tmdbShows: TShowsResultTMDB[],
): TShowsResultUser[] => {
	const mergedShows = [...userShows];

	return tmdbShows.map((tmdbShow) => {
		const matchingId = mergedShows.find(
			(userShow) => userShow.showId === tmdbShow.showId,
		);
		if (matchingId) {
			return {
				...tmdbShow,
				isWatched: matchingId.isWatched,
				isAdded: matchingId.isAdded,
			};
		}

		return tmdbShow;
	});
};

export { mergeShowsFromUserToTmdb };
