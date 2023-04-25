import styled from "styled-components";
import { mediaQuery } from "@theme/theme";

const MovieListItemHeader = styled.div`
	height: 32px;
	padding: 8px 0;
	display: flex;
	position: sticky;
	top: 0px;
	z-index: 1;
	background-color: #212121;

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

const MovieTextWrapper = styled.div`
	display: flex;
	flex: 5;
	flex-direction: column;
	justify-content: center;
	${mediaQuery("largeHandset")`
		font-size: 10px;
	`}
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
	flex: 2;

	${mediaQuery("largeHandset")`
    margin: 12px 0 0 0;

		& .MuiButton-root {
			font-size: 10px;
		}
	`}
`;

const MoviesListHeader = () => {
	return (
		<MovieListItemHeader>
			<MoviePosterWrapper>Poster</MoviePosterWrapper>
			<MovieTextWrapper>Overview</MovieTextWrapper>
			<MovieRatingWrapper>Rating</MovieRatingWrapper>
			<MovieReleaseDate>Release Date</MovieReleaseDate>
			<ButtonWrapper>Action</ButtonWrapper>
		</MovieListItemHeader>
	);
};

export { MoviesListHeader };
