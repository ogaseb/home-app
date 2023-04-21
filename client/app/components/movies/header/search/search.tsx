import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { searchByQuery } from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { TFormInput } from "@pages/shows_page/shows_page.types";
import { mediaQuery } from "@theme/theme";
import Fuse from "fuse.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	addedUserResults,
	setSearchShows,
} from "@stores/shows_store/user_shows/user_shows";
import { useEffect } from "react";

const StyledForm = styled.form`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: end;

	${mediaQuery("largeHandset")`
		& > div {
	    flex: 100$;
	  }
	`}
`;

const StyledInput = styled(TextField)`
	&& {
		flex: 75%;
		background-color: rgba(25, 118, 210, 0.04);
		border-radius: 4px;
		color: white;
		margin-right: 16px;

		.MuiOutlinedInput-root {
			color: white;
			height: 32px;
			border: 1px solid rgba(25, 118, 210, 0.5);
		}
	}
`;

const MoviesHeaderSearch = () => {
	const dispatch = useAppDispatch();
	const resultsUser = useAppSelector(addedUserResults);
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	const schema = yup
		.object()
		.shape({
			movieName: yup.string().required(),
		})
		.required();

	const { control, handleSubmit, watch } = useForm<TFormInput>({
		defaultValues: {
			movieName: "",
		},
		resolver: yupResolver(schema),
	});

	const fuse = new Fuse(resultsUser, {
		keys: ["title", "originalTitle"],
		threshold: 0.5,
	});

	const onSubmit: SubmitHandler<TFormInput> = async (data) => {
		if (whichShowsResultsToShow === "tmdb") {
			return await dispatch(searchByQuery({ query: data.movieName, page: 1 }));
		}
	};

	const watchedValue = watch("movieName", "");
	useEffect(() => {
		if (whichShowsResultsToShow === "user") {
			dispatch(
				setSearchShows(fuse.search(watchedValue).map((el) => ({ ...el.item }))),
			);
		}
	}, [watchedValue]);

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="movieName"
				control={control}
				render={({ field }) => (
					<StyledInput size="small" variant="outlined" {...field} />
				)}
			/>
			{whichShowsResultsToShow === "tmdb" && (
				<Button type="submit" variant="outlined" size="small">
					Search
				</Button>
			)}
		</StyledForm>
	);
};

export { MoviesHeaderSearch };
