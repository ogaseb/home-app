import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { setCurrentPage } from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { Pagination } from "@mui/material";
import { mediaQuery } from "@theme/theme";

const PaginationWrapper = styled.div`
	margin-top: 16px;
	position: relative;
	right: 50%;
	bottom: 0;
	transform: translateX(50%);
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

const MoviesPagination = () => {
	const dispatch = useAppDispatch();
	const {
		shows: { totalPages, page },
	} = useAppSelector((state) => state.showsStore.tmdbShows);

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		page: number,
	) => {
		dispatch(setCurrentPage(page));
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
