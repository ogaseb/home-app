import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { useForm } from "react-hook-form";
import { getPopular } from "@stores/tmdb_shows_store/tmdb_shows_store";
import { useEffect } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mediaQuery } from "@theme/theme";
import { MoviesHeader } from "@components/movies/header/header";
import { MoviesList } from "@components/movies/list/list";
import { MoviesPagination } from "@components/movies/pagination/pagination";
import { TFormInput } from "./shows_page.types";

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

const ShowsPage = () => {
	const dispatch = useAppDispatch();
	const {
		loading: showsLoading,
		shows: { results, page },
	} = useAppSelector((state) => state.tmdbShowsStore);

	useEffect(() => {
		if (showsLoading === "idle") {
			dispatch(getPopular({ page }));
		}
	}, [showsLoading, results]);

	const schema = yup
		.object()
		.shape({
			movieName: yup.string().required(),
		})
		.required();

	const { control, handleSubmit, getValues } = useForm<TFormInput>({
		defaultValues: {
			movieName: "",
		},
		resolver: yupResolver(schema),
	});

	return (
		<Wrapper>
			<MoviesHeader control={control} handleSubmit={handleSubmit} />
			<MoviesList />
			<MoviesPagination getValues={getValues} />
		</Wrapper>
	);
};

export default ShowsPage;
