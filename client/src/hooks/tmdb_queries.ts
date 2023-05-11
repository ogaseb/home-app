import {
	useGetFromCategoryQuery,
	useSearchQuery,
	useGetRecommendedOrSimilarQuery,
} from "@services/api/TMDB_api/TMDB_api";
import { useAppSelector } from "./hooks";

function useTMDBQueries() {
	const {
		currentMediaType,
		currentCategory,
		latestShowId,
		lastSearchedMovie,
		shows: { page },
	} = useAppSelector((state) => state.showsStore.tmdbShows);

	const skipCategory = ["recommendations", "similar", "search"].includes(
		currentCategory,
	);
	const categoryQuery = useGetFromCategoryQuery(
		{
			currentMediaType,
			currentCategory,
			page,
		},
		{ refetchOnMountOrArgChange: true, skip: skipCategory },
	);

	const skipSearch = [
		"popular",
		"top_rated",
		"upcoming",
		"now_playing",
		"airing_today",
		"on_the_air",
		"recommendations",
		"similar",
	].includes(currentCategory);
	const searchQuery = useSearchQuery(
		{ search: lastSearchedMovie, page },
		{ refetchOnMountOrArgChange: true, skip: skipSearch },
	);

	const skipSimilarOrRecommendations = [
		"popular",
		"top_rated",
		"upcoming",
		"now_playing",
		"airing_today",
		"on_the_air",
		"search",
	].includes(currentCategory);
	const recommendedOrSimilarQuery = useGetRecommendedOrSimilarQuery(
		{
			currentMediaType,
			id: latestShowId,
			currentCategory,
			page,
		},
		{ refetchOnMountOrArgChange: true, skip: skipSimilarOrRecommendations },
	);

	return { categoryQuery, searchQuery, recommendedOrSimilarQuery };
}

export { useTMDBQueries };
