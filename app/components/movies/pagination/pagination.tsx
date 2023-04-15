import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import {
	getNowPlaying,
	getPopular,
	getRecommendationByShowId,
	getSimilarByShowId,
	getTopRated,
	getUpcoming,
	searchByQuery,
} from "@stores/shows_store/shows_store";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import { UseFormGetValues } from "react-hook-form";
import { TFormInput } from "@pages/shows_page/shows_page.types";

const PaginationWrapper = styled.div`
	margin-top: 16px;
	display: flex;
	justify-content: center;

	.MuiPagination-root > ul > li > button {
		color: white;
		border: grey 1px solid;
		min-width: 32px;
	}

	.MuiPagination-root > ul > li > div {
		color: white;
	}

	${mediaQuery("largeHandset")`
		.MuiPagination-root > ul > li > button {
			min-width: unset;
		}
	`}
`;

const StyledPagination = styled(Pagination)``;

const MoviesPagination = ({
	getValues,
}: {
	getValues: UseFormGetValues<TFormInput>;
}) => {
	const dispatch = useAppDispatch();
	const {
		currentCategory,
		latestShowId,
		currentMediaType,
		shows: { totalPages, page },
	} = useAppSelector((state) => state.shows);

	const handlePageChange = (_event: any, page: number) => {
		switch (currentCategory) {
			case "popular":
				dispatch(getPopular({ page }));
				break;
			case "top_rated":
				dispatch(getTopRated({ page }));
				break;
			case "upcoming":
				dispatch(getUpcoming({ page }));
				break;
			case "now_playing":
				dispatch(getNowPlaying({ page }));
				break;
			case "recommendation":
				dispatch(
					getRecommendationByShowId({
						id: latestShowId,
						mediaType: currentMediaType,
						page: page,
					}),
				);
				break;
			case "similar":
				dispatch(
					getSimilarByShowId({
						id: latestShowId,
						mediaType: currentMediaType,
						page: page,
					}),
				);
				break;
			case "search":
				dispatch(searchByQuery({ query: getValues("movieName"), page }));
				break;
		}
	};

	return (
		<PaginationWrapper>
			<StyledPagination
				count={totalPages > 1000 ? 999 : totalPages}
				variant="outlined"
				color="primary"
				shape="rounded"
				page={page}
				onChange={handlePageChange}
			/>
		</PaginationWrapper>
	);
};

export { MoviesPagination };
