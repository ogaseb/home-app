import { useAppSelector } from "@hooks/hooks";
import styled from "styled-components";
import { mediaQuery } from "@theme/theme";
import { mergeShowsFromUserToTmdb } from "@stores/shows_store/shows_store";
import { ProgressSpinner } from "@components/progress/progress";
import { MoviesListActionButtons } from "./action_buttons/action_buttons";
import { MoviesListHeader } from "./header/header";
import { MoviesListError } from "./error/error";
import { addedUserResults } from "@stores/shows_store/user_shows/user_shows";
import { MoviesListRating } from "./rating/rating";
import { MoviesListPoster } from "./poster/poster";

const MoviesListWrapper = styled.div`
	position: relative;
	color: white;
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - ${(props) => props.theme.appBarHeight} - 132px);

	border: 1px solid rgba(25, 118, 210, 0.5);
	box-shadow: -2px 6px 13px -7px rgba(25, 118, 210, 0.5);

	& > div:nth-child(even) {
		background-color: #171717;
	}

	@media only screen and (max-width: 480px) {
		height: calc(100vh - ${(props) => props.theme.appBarHeight} - 186px);
	}
`;

const MovieListItem = styled.div`
	height: 240px;
	padding: 8px 0;
	display: flex;
	justify-content: space-between;

	${mediaQuery("largeHandset")`
		flex-wrap: wrap;
    height: unset; 
	`}
`;

const MovieTextWrapper = styled.div`
	display: flex;
	flex: 5;
	flex-direction: column;
	justify-content: center;
	${mediaQuery("largeHandset")`
		font-size: 10px;
	`}
`;

const MovieTitle = styled.div`
	font-size: 24px;
	margin: 0 8px;

	${mediaQuery("largeHandset")`
		font-size: 14px;
	`}
`;

const MovieDescription = styled.div`
	margin-top: 20px;
	margin: 20px 8px 0 8px;
`;

const MovieReleaseDate = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;

	${mediaQuery("largeHandset")`
		display: none;
	`}
`;

const MovieOriginalTitle = styled.div`
	color: gray;
	font-size: 16px;
	margin: 0 8px;
`;

const MoviesList = () => {
	const { loading: tmdbLoading } = useAppSelector(
		(state) => state.showsStore.tmdbShows,
	);
	const { searchShows } = useAppSelector((state) => state.showsStore.userShows);
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	const resultsUser = useAppSelector(addedUserResults);
	const resultsTmdb = useAppSelector(mergeShowsFromUserToTmdb);

	if (
		whichShowsResultsToShow === "tmdb" &&
		tmdbLoading === "succeeded" &&
		!resultsTmdb.length
	) {
		return <MoviesListError />;
	}

	if (whichShowsResultsToShow === "user" && !resultsUser.length) {
		return <MoviesListError />;
	}

	const movies = searchShows.length
		? searchShows
		: whichShowsResultsToShow === "user"
		? resultsUser
		: resultsTmdb;

	return (
		<MoviesListWrapper>
			<MoviesListHeader />
			{tmdbLoading !== "pending" && movies.length ? (
				movies.map((show: any) => {
					const {
						id,
						posterPath,
						title,
						originalTitle,
						mediaType,
						overview,
						releaseDate,
						voteAverage,
					} = show;
					return (
						<MovieListItem key={id}>
							<MoviesListPoster posterPath={posterPath} />
							<MovieTextWrapper>
								<MovieTitle>{title}</MovieTitle>
								<MovieOriginalTitle>
									{originalTitle} | type: {mediaType}
								</MovieOriginalTitle>
								<MovieDescription>{overview}</MovieDescription>
							</MovieTextWrapper>
							<MoviesListRating voteAverage={voteAverage} />
							<MovieReleaseDate>{releaseDate}</MovieReleaseDate>
							<MoviesListActionButtons show={show} />
						</MovieListItem>
					);
				})
			) : (
				<ProgressSpinner />
			)}
		</MoviesListWrapper>
	);
};

export { MoviesList };
