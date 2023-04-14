import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import {
	searchByQuery,
	showPopular,
	showTopRated,
} from "@stores/movies_store/movies_store";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import { UseFormGetValues } from "react-hook-form";
import { TFormInput } from "@pages/movies_page/movies_page.types";

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
		movies: { totalPages, page },
	} = useAppSelector((state) => state.movies);

	const handlePageChange = (_event: React.ChangeEvent, page: number) => {
		switch (currentCategory) {
			case "popular":
				dispatch(showPopular(page));
				break;
			case "top_rated":
				dispatch(showTopRated(page));
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
				onChange={(event, page) => handlePageChange(event, page)}
			/>
		</PaginationWrapper>
	);
};

export { MoviesPagination };
