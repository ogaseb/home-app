import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
	changeCurrentCategory,
	setLatestSearchQuery,
} from "@stores/shows_store/tmdb_shows/tmdb_shows";
import { TFormInput } from "@pages/shows_page/shows_page.types";
import { mediaQuery } from "@theme/theme";
import Fuse from "fuse.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setSearchShows } from "@stores/shows_store/user_shows/user_shows";
import { useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { useGetAllUserShowsQuery } from "@services/api/user_api/user_api";
import { filteredUserShows } from "@utils/shows/filtered_user_shows";

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

		.MuiOutlinedInput-root {
			color: white;
			height: 32px;
			border: 1px solid rgba(25, 118, 210, 0.5);
		}
	}
`;

const Wrapper = styled.div`
	&& {
		width: 90%;
		margin-bottom: 20px;
	}
`;

const StyledTypography = styled(Typography)`
	&& {
		color: white;
	}
`;

const MoviesHeaderSearch = () => {
	const dispatch = useAppDispatch();
	const { currentMediaType } = useAppSelector(
		(state) => state.showsStore.tmdbShows,
	);
	const { whichShowsResultsToShow } = useAppSelector((state) => state.uiStore);

	const { data: shows = [] } = useGetAllUserShowsQuery();

	const userShows = useMemo(() => {
		return filteredUserShows(shows, currentMediaType);
	}, [shows, currentMediaType]);

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

	const fuse = new Fuse(userShows, {
		keys: ["title", "originalTitle"],
		threshold: 0.5,
	});

	const onSubmit: SubmitHandler<TFormInput> = async (data) => {
		if (whichShowsResultsToShow === "tmdb") {
			dispatch(changeCurrentCategory("search"));
			return dispatch(setLatestSearchQuery(data.movieName));
		}
	};

	const watchedValue = watch("movieName", "");
	if (whichShowsResultsToShow === "user") {
		dispatch(
			setSearchShows(fuse.search(watchedValue).map((el) => ({ ...el.item }))),
		);
	}

	return (
		<Wrapper>
			<StyledTypography>Search</StyledTypography>
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
		</Wrapper>
	);
};

export { MoviesHeaderSearch };
