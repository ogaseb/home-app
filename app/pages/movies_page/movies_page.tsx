import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { useForm } from "react-hook-form";
import {
	showPopular,
	searchByQuery,
	showTopRated,
} from "@stores/movies_store/movies_store";
import { useEffect } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mediaQuery } from "@theme/theme";
import { MoviesHeader } from "@components/movies/header/header";
import { MoviesList } from "@components/movies/list/list";
import { MoviesPagination } from "@components/movies/pagination/pagination";
import { TFormInput } from "./movies_page.types";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 80%;

	${mediaQuery("desktop")`
		width: 95%;
	`}

	${mediaQuery("largeTablet")`
		width: 100%;
	`}
`;

const MoviesPage = () => {
	const dispatch = useAppDispatch();
	const {
		currentCategory,
		loading,
		movies: { results, page },
	} = useAppSelector((state) => state.movies);

	useEffect(() => {
		if (loading === "idle") {
			dispatch(showPopular(page));
		}
	}, [loading, results]);

	const schema = yup
		.object()
		.shape({
			movieName: yup.string().required(),
		})
		.required();

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

	const { control, handleSubmit, getValues } = useForm<TFormInput>({
		defaultValues: {
			movieName: "",
		},
		resolver: yupResolver(schema),
	});

	return (
		<Wrapper>
			<MoviesHeader control={control} handleSubmit={handleSubmit} />
			<MoviesList handlePageChange={handlePageChange} />
			<MoviesPagination getValues={getValues} />
		</Wrapper>
	);
};

export default MoviesPage;
