import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import styled from "styled-components";
import { Button, ButtonGroup, CircularProgress, Divider } from "@mui/material";
import { TMoviesResult } from "@stores/movies_store/movies_store.types";
import { mediaQuery } from "@theme/theme";
import {
	getRecommendationByMovieId,
	getSimilarByMovieId,
} from "@stores/movies_store/movies_store";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";

const MoviesListWrapper = styled.div`
	position: relative;
	color: white;
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - ${(props) => props.theme.appBarHeight} - 168px);

	border: 1px solid rgba(25, 118, 210, 0.5);
	box-shadow: -2px 6px 13px -7px rgba(25, 118, 210, 0.5);

	& > div:nth-child(odd) {
		background-color: #121212;
	}

	& > div:nth-child(even) {
		background-color: #171717;
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

const MovieListItemHeader = styled.div`
	height: 32px;
	padding: 8px 0;
	display: flex;
	position: sticky;
	top: 0px;
	z-index: 1;

	& > div {
		justify-content: center;
		flex-direction: row;
	}

	${mediaQuery("largeHandset")`
		display: none;
	`}
`;

const MoviePosterWrapper = styled.div`
	display: flex;
	flex: 1.5;
	justify-content: center;
	align-items: center;
	margin-left: 8px;

	${mediaQuery("largeHandset")`
    height: unset; 
	`}
`;
const MoviePosterImg = styled.img`
	height: 240px;

	${mediaQuery("largeHandset")`
		height: 200px;
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

const MovieRatingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	position: relative;

	${mediaQuery("largeHandset")`
		display: none;
	`}
`;
const MoviesRatingText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
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

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;

	${mediaQuery("largeHandset")`
    font-size: 10px;
    margin: 12px 0 0 0;
	`}
`;

const FlexCenterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const MovieOriginalTitle = styled.div`
	color: gray;
	font-size: 16px;
	margin: 0 8px;
`;

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
`;

const ErrorText = styled.div`
	color: white;
	font-size: 36px;
	text-align: center;
	margin-bottom: 8px;

	${mediaQuery("largeHandset")`
    font-size: 24px;
	`}
`;

const MoviesList = ({ handlePageChange }: { handlePageChange: any }) => {
	const dispatch = useAppDispatch();
	const {
		movies: { page },
	} = useAppSelector((state) => state.movies);

	const isMobile = useMediaQuery({
		query: "(max-width: 480px)",
	});

	const voteRateCircleColor = (voteAverage: number) => {
		const percentage = voteAverage * 10;
		switch (true) {
			case percentage <= 30:
				return "error";
			case percentage <= 50:
				return "warning";
			case percentage <= 70:
				return "info";
			default:
				return "success";
		}
	};

	const {
		loading,
		movies: { results },
	} = useAppSelector((state) => state.movies);

	if (loading === "succeeded" && !results.length) {
		return (
			<MoviesListWrapper>
				<FlexCenterWrapper>
					<ErrorWrapper>
						<ErrorText>There is no movies to show</ErrorText>
						<Button
							variant="outlined"
							onClick={(event) => handlePageChange(event, page)}
						>
							Go Back
						</Button>
					</ErrorWrapper>
				</FlexCenterWrapper>
			</MoviesListWrapper>
		);
	}

	return (
		<MoviesListWrapper>
			<MovieListItemHeader>
				<MoviePosterWrapper>Poster</MoviePosterWrapper>
				<MovieTextWrapper>Overview</MovieTextWrapper>
				<MovieRatingWrapper>Rating</MovieRatingWrapper>
				<MovieReleaseDate>Release Date</MovieReleaseDate>
				<ButtonWrapper>Action</ButtonWrapper>
			</MovieListItemHeader>
			{loading !== "pending" ? (
				results.map((movie: TMoviesResult) => (
					<MovieListItem key={movie.id}>
						<MoviePosterWrapper>
							<MoviePosterImg
								src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
							/>
						</MoviePosterWrapper>
						<MovieTextWrapper>
							<MovieTitle>{movie.title}</MovieTitle>
							<MovieOriginalTitle>{movie.originalTitle}</MovieOriginalTitle>
							<MovieDescription>{movie.overview}</MovieDescription>
						</MovieTextWrapper>
						<MovieRatingWrapper>
							<CircularProgress
								variant="determinate"
								value={movie.voteAverage * 10}
								color={voteRateCircleColor(movie.voteAverage)}
							/>
							<MoviesRatingText>
								{movie.voteAverage.toFixed(1)}
							</MoviesRatingText>
						</MovieRatingWrapper>
						<MovieReleaseDate>{movie.releaseDate}</MovieReleaseDate>
						<ButtonWrapper>
							<ButtonGroup
								orientation={isMobile ? "horizontal" : "vertical"}
								size="small"
							>
								<Button>Add</Button>
								<Button>Watched</Button>
								<Button
									onClick={() =>
										dispatch(
											getRecommendationByMovieId({
												movieId: movie.id,
												page: 1,
											}),
										)
									}
								>
									Recommend
								</Button>
								<Button
									onClick={() =>
										dispatch(
											getSimilarByMovieId({
												movieId: movie.id,
												page: 1,
											}),
										)
									}
								>
									Similar
								</Button>
							</ButtonGroup>
						</ButtonWrapper>
					</MovieListItem>
				))
			) : (
				<FlexCenterWrapper>
					<CircularProgress />
				</FlexCenterWrapper>
			)}
		</MoviesListWrapper>
	);
};

export { MoviesList };
