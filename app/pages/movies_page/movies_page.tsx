import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import Input from "@mui/material/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { searchByQuery, showPopular } from "@stores/movies_store/movies_store";
import { useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress, Pagination } from "@mui/material";
import { TMoviesResult } from "@stores/movies_store/movies_store.types";
import { mediaQuery } from "@theme/theme";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 80%;

	${mediaQuery("largeHandset")`
		width: 100%;
	`}
`;

const MoviesListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - ${(props) => props.theme.appBarHeight} - 144px);
`;

const MovieListItem = styled.div`
	height: 240px;
`;

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 64px;
`;

const MoviePosterImg = styled.img`
	height: 240px;
	display: flex;
`;

const StyledInput = styled(Input)`
	background-color: grey;

	.MuiInput-root {
		background-color: red;
	}

	.MuiInput-input {
		color: white;
	}
`;

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

interface IFormInput {
	movieName: string;
}

const MoviesPage = () => {
	const dispatch = useAppDispatch();
	const {
		loading,
		movies: { results, totalPages },
	} = useAppSelector((state) => state.movies);

	useEffect(() => {
		console.log(loading);
		if (loading === "idle") {
			dispatch(showPopular(1));
		}
		console.log(results);
	}, [loading, results]);

	const schema = yup
		.object()
		.shape({
			movieName: yup.string().required(),
		})
		.required();

	const { control, handleSubmit } = useForm<IFormInput>({
		defaultValues: {
			movieName: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		dispatch(searchByQuery({ query: data.movieName, page: 1 }));
	};

	if (loading === "pending") {
		return (
			<Wrapper>
				<CircularProgress />
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<HeaderWrapper>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="movieName"
						control={control}
						render={({ field }) => <StyledInput {...field} />}
					/>
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</form>
				<Button variant="contained">Popular</Button>
				<Button variant="contained">Top Rated</Button>
			</HeaderWrapper>
			<MoviesListWrapper>
				{results.map((title: TMoviesResult) => (
					<MovieListItem key={title.id}>
						<MoviePosterImg
							src={`https://image.tmdb.org/t/p/w500/${title.posterPath}`}
						/>
					</MovieListItem>
				))}
			</MoviesListWrapper>
			<PaginationWrapper>
				<StyledPagination
					count={totalPages}
					variant="outlined"
					color="primary"
					shape="rounded"
				/>
			</PaginationWrapper>
		</Wrapper>
	);
};

export default MoviesPage;
