import styled from "styled-components";
import { mediaQuery } from "@theme/theme";
import posterNotFound from "@assets/poster_not_found.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

const MoviesListPoster = ({ posterPath }: { posterPath: string | null }) => {
	return (
		<MoviePosterWrapper>
			<LazyLoadImage
				alt={"poster image"}
				height={200}
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
