import styled from "styled-components";
import { mediaQuery } from "@theme/theme";
import posterNotFound from "@assets/poster_not_found.png";

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
	height: 200px;

	${mediaQuery("largeHandset")`
		height: 200px;
	`}
`;

const MoviesListPoster = ({ posterPath }: { posterPath: string | null }) => {
	return (
		<MoviePosterWrapper>
			<MoviePosterImg
				src={
					posterPath
						? `https://image.tmdb.org/t/p/w500/${posterPath}`
						: posterNotFound
				}
			/>
		</MoviePosterWrapper>
	);
};

export { MoviesListPoster };
