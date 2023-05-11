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
	border-bottom: 1px solid #33343a;

	& > div {
		justify-content: center;
		flex-direction: row;
	}

	${mediaQuery("largeHandset")`
		display: none;
	`}
`;

const MainWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MoviePosterWrapper = styled(MainWrapper)`
	flex: 1.5;
	margin-left: 8px;
`;

const MovieTextWrapper = styled(MainWrapper)`
	flex: 5;
`;

const MovieRatingWrapper = styled(MainWrapper)`
	flex: 1;
`;

const MovieReleaseDate = styled(MainWrapper)`
	flex: 1;
`;

const ButtonWrapper = styled(MainWrapper)`
	flex: 2;
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
