import { useAppSelector } from "@hooks/redux_hooks";
import styled from "styled-components";
import { mediaQuery, screens } from "@theme/theme";
import { ProgressSpinner } from "@components/progress/progress";
import { MoviesListActionButtons } from "./action_buttons/action_buttons";
import { MoviesListHeader } from "./header/header";
import { MoviesListError } from "./error/error";
import { MoviesListRating } from "./rating/rating";
import { MoviesListPoster } from "./poster/poster";
import { useMediaQuery } from "react-responsive";
import { useGetAllUserShowsQuery } from "@services/api/user_api/user_api";
import { useMemo, useState } from "react";
import { filteredUserShows } from "@utils/shows/filtered_user_shows";
import { mergeShowsFromUserToTmdb } from "@utils/shows/merge_shows_from_user_to_tmdb";
import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";
import { useTMDBQueries } from "@hooks/tmdb_queries";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, ListItem, ListItemButton, ListItemText, Modal, Typography } from "@mui/material";
import { useVideos } from "@hooks/youtube_videos";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";
import { TrailerDialog } from "./trailer/trailer";

const MoviesListWrapper = styled.div`
	position: relative;
	color: white;
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - ${(props) => props.theme.appBarHeight} - 68px);
	scroll-behavior: smooth;

	& > div:nth-child(even) {
		background-color: #171717;
	}

	@media only screen and (max-width: 480px) {
		height: calc(100vh - ${(props) => props.theme.appBarHeight} - 86px);
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

const MovieReleaseDate = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;

	${mediaQuery("largeHandset")`
		flex: 60%;
		margin-top: 8px;
		font-size: 12px;
	`}
`;

const MovieDescription = styled.div`
	margin-top: 20px;
	margin: 20px 8px 0 8px;
	overflow: hidden;
`;

const MovieOriginalTitle = styled.div`
	color: gray;
	font-size: 16px;
	margin: 0 8px;
`;

const MoviesList = () => {
	const {
		categoryQuery: { isSuccess: isSuccessfulCategoryQuery },
		searchQuery: { isSuccess: isSuccessfulSearchQuery },
		recommendedOrSimilarQuery: {
			isSuccess: isSuccessfulRecommendedOrSimilarQuery,
		},
	} = useTMDBQueries();
	const { searchShows } = useAppSelector((state) => state.showsStore.userShows);
	const {
		currentMediaType,
		shows: { results: tmdbShows },
	} = useAppSelector((state) => state.showsStore.tmdbShows);
	const { whichShowsResultsToShow, whichShowsUserToShow } = useAppSelector((state) => state.uiStore);
	const { data: shows = [] } = useGetAllUserShowsQuery();

	const userShows = useMemo(() => {
		return filteredUserShows(shows, currentMediaType);
	}, [shows, currentMediaType]);

	const mergedShowsFromUserToTmdb = useMemo(() => {
		return mergeShowsFromUserToTmdb(userShows, tmdbShows);
	}, [userShows, tmdbShows]);

	const userShowsWatched = useMemo(() => {
		return userShows.filter((show)=> show.isWatched)
	}, [userShows]);

	const userShowsAdded = useMemo(() => {
		return userShows.filter((show)=> show.isAdded && !show.isWatched)
	}, [userShows]);

	const { loading: tmdbLoading } = useAppSelector(
		(state) => state.showsStore.tmdbShows,
	);

	const isMobile = useMediaQuery({
		query: `(max-width: ${screens.largeHandset}px)`,
	});

	let moviesList: TShowsResultUser[] = [];
	if (whichShowsResultsToShow === "user") {
		moviesList = userShows;
	}

	if (whichShowsUserToShow === "watched") {
		moviesList = userShowsWatched;
	}

	if (whichShowsUserToShow === "added") {
		moviesList = userShowsAdded;
	}

	if (whichShowsResultsToShow === "tmdb") {
		moviesList = mergedShowsFromUserToTmdb;
	}

	if (searchShows.length) {
		moviesList = searchShows;
	}

	if (
		whichShowsResultsToShow === "tmdb" &&
		tmdbLoading === "succeeded" &&
		!mergedShowsFromUserToTmdb.length
	) {
		return <MoviesListError />;
	}

	if (whichShowsResultsToShow === "user" && !moviesList.length) {
		return <MoviesListError />;
	}

	const [videoTitle, setVideoTitle] = useState(null);

	const onClick = (videoTitle: string) => {
		setVideoTitle(videoTitle)
	}
	
	return (
		<MoviesListWrapper id="moviesListWrapper">
			{(isSuccessfulCategoryQuery ||
				isSuccessfulSearchQuery ||
				isSuccessfulRecommendedOrSimilarQuery) &&
			moviesList.length ? (
				<>
					<TrailerDialog videoTitle={videoTitle} />
					<MoviesListHeader />
					{moviesList.map((show: TShowsResultUser, index) => {
						const {
							posterPath,
							title,
							originalTitle,
							mediaType,
							overview,
							releaseDate,
							voteAverage,
						} = show;
						return (
							<MovieListItem key={index}>
								<MoviesListPoster posterPath={posterPath} />
								<MovieTextWrapper>
									<MovieTitle>{title}</MovieTitle>
									<MovieOriginalTitle>
										{originalTitle} | type: {mediaType} | YT trailer: <Button onClick={()=>onClick(`${title} trailer`)}> YT search</Button>
									</MovieOriginalTitle>
									<MovieDescription>{overview}</MovieDescription>
								</MovieTextWrapper>
								<MoviesListRating voteAverage={voteAverage} />
								<MovieReleaseDate>
									{isMobile ? `Release date: ${releaseDate}` : releaseDate}
								</MovieReleaseDate>
								<MoviesListActionButtons show={show} />
							</MovieListItem>
						);
					})}
				</>
			) : (
				<ProgressSpinner />
			)}
		</MoviesListWrapper>
	);
};

export { MoviesList };
