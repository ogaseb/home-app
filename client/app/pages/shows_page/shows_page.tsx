import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { getPopular } from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { useEffect } from "react";
import styled from "styled-components";
import { mediaQuery } from "@theme/theme";
import { MoviesHeader } from "@components/movies/header/header";
import { MoviesList } from "@components/movies/list/list";
import { MoviesPagination } from "@components/movies/pagination/pagination";
import { getAllUserShows } from "@stores/shows_store/user_shows/user_shows";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 80%;

	${mediaQuery("desktop")`
		width: 95%;
	`}

	${mediaQuery("largeTablet")`
		width: 100%;
	`}
`;

const ShowsPage = () => {
	const dispatch = useAppDispatch();
	const {
		loading: showsLoading,
		shows: { results, page },
	} = useAppSelector((state) => state.showsStore.tmdbShows);
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	useEffect(() => {
		dispatch(getAllUserShows());

		if (showsLoading === "idle") {
			dispatch(getPopular({ page }));
		}
	}, [showsLoading, results]);

	return (
		<Wrapper>
			<MoviesHeader />
			<MoviesList />
			{whichShowsResultsToShow === "tmdb" && <MoviesPagination />}
		</Wrapper>
	);
};

export default ShowsPage;
