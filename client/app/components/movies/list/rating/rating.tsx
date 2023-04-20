import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import { useMemo } from "react";

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

const MoviesListRating = ({ voteAverage }: { voteAverage: number }) => {
	const voteRateCircleColor: "error" | "warning" | "info" | "success" =
		useMemo(() => {
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
		}, [voteAverage]);

	return (
		<MovieRatingWrapper>
			<CircularProgress
				variant="determinate"
				value={voteAverage * 10}
				color={voteRateCircleColor}
			/>
			<MoviesRatingText>{voteAverage.toFixed(1)}</MoviesRatingText>
		</MovieRatingWrapper>
	);
};

export { MoviesListRating };
