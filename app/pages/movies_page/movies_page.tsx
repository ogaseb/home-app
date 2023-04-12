import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import Input from "@mui/material/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { searchByQuery, showPopular } from "@stores/movies_store/movies_store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 80%;
`;

const MoviesListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - ${(props) => props.theme.appBarHeight} - 96px);
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

interface IFormInput {
	movieName: string;
}

const MoviesPage = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { loading, search } = useAppSelector((state) => state.movies);

	useEffect(() => {
		console.log(loading);
		if (loading === "idle") {
			dispatch(showPopular(1));
		}
		console.log(search);
	}, [loading, search]);

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
		console.log(data);
		dispatch(searchByQuery({ query: data.movieName, page: 1 }));
	};

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
				{search.map((title) => (
					<MovieListItem key={title.id}>
						<MoviePosterImg
							src={`https://image.tmdb.org/t/p/w500/${title.poster_path}`}
						/>
					</MovieListItem>
				))}
			</MoviesListWrapper>
		</Wrapper>
	);
};

export default MoviesPage;
