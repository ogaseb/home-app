import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
	Controller,
	SubmitHandler,
	Control,
	UseFormHandleSubmit,
} from "react-hook-form";
import {
	searchByQuery,
	getPopular,
	getTopRated,
	getUpcoming,
	getNowPlaying,
	changeCurrentMediaType,
} from "@stores/shows_store/shows_store";
import { TFormInput } from "@pages/shows_page/shows_page.types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { mediaQuery } from "@theme/theme";
import { useMediaQuery } from "react-responsive";

const HeaderWrapper = styled.div`
	margin: 8px 0px;
	display: flex;
	flex-direction: row-reverse;

	& :nth-child(2) {
		justify-content: center;
	}

	${mediaQuery("largeHandset")`
		flex-wrap: wrap;
	
		& :nth-child(2) {
			justify-content: center;
		}
	`}
`;

const StyledForm = styled.form`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: end;

	${mediaQuery("largeHandset")`
		order: 3;

		& > div {
	    flex-wrap: wrap;
		  margin-right: 16px;
		  flex: 1;
      justify-content: space-between;
	  }
	`}
`;

const ButtonGroupWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;

	${mediaQuery("largeHandset")`
		justify-content: center;

		& .MuiToggleButtonGroup-root > button {
			font-size: 12px;
		}
	`}
`;

const StyledInput = styled(TextField)`
	&& {
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
	&& {
		.MuiToggleButton-root {
			color: #1976d2;
			border: 1px solid rgba(25, 118, 210, 0.5);
			border-radius: 4px;
			height: 32px;
			line-height: 32px;
			transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
				color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		}

		.MuiToggleButton-root:hover {
			border: 1px solid #1976d2;
		}

		.MuiToggleButtonGroup-grouped:not(:first-of-type).Mui-selected {
			border-left: 1px solid #1976d2;
		}

		.Mui-selected {
			border: 1px solid #1976d2;
			background-color: rgb(33, 33, 33);
		}
	}
`;

const MoviesHeader = ({
	control,
	handleSubmit,
}: {
	control: Control<TFormInput>;
	handleSubmit: UseFormHandleSubmit<TFormInput>;
}) => {
	const dispatch = useAppDispatch();
	const { currentCategory, currentMediaType } = useAppSelector(
		(state) => state.shows,
	);

	const onSubmit: SubmitHandler<TFormInput> = (data) => {
		dispatch(searchByQuery({ query: data.movieName, page: 1 }));
	};

	const onCategoryChange = (
		_event: React.MouseEvent<HTMLElement>,
		newCategory: string,
	) => {
		switch (newCategory) {
			case "popular":
				dispatch(getPopular({ page: 1 }));
				break;
			case "top_rated":
				dispatch(getTopRated({ page: 1 }));
				break;
			case "upcoming":
				dispatch(getUpcoming({ page: 1 }));
				break;
			case "now_playing":
				dispatch(getNowPlaying({ page: 1 }));
				break;
		}
	};

	const onSectionChange = (
		_event: React.MouseEvent<HTMLElement>,
		newSection: "movie" | "tv",
	) => {
		dispatch(changeCurrentMediaType(newSection));
		switch (currentCategory) {
			case "popular":
				dispatch(getPopular({ page: 1 }));
				break;
			case "top_rated":
				dispatch(getTopRated({ page: 1 }));
				break;
			case "upcoming":
				dispatch(getUpcoming({ page: 1 }));
				break;
			case "now_playing":
				dispatch(getNowPlaying({ page: 1 }));
				break;
		}
	};

	const isMobile = useMediaQuery({
		query: "(max-width: 480px)",
	});

	return (
		<HeaderWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="movieName"
					control={control}
					render={({ field }) => (
						<StyledInput size="small" variant="outlined" {...field} />
					)}
				/>
				<Button type="submit" variant="outlined" size="small">
					Search
				</Button>
			</StyledForm>
			<ButtonGroupWrapper>
				<StyledToggleButtonGroup
					value={currentMediaType}
					exclusive
					size={isMobile ? "small" : "medium"}
				>
					<ToggleButton
						value="movie"
						onClick={(event, value) => onSectionChange(event, value)}
					>
						Movies
					</ToggleButton>
					<ToggleButton
						value="tv"
						onClick={(event, value) => onSectionChange(event, value)}
					>
						Anime/Tv
					</ToggleButton>
				</StyledToggleButtonGroup>
			</ButtonGroupWrapper>
			<ButtonGroupWrapper>
				<StyledToggleButtonGroup
					value={currentCategory}
					exclusive
					size={isMobile ? "small" : "medium"}
				>
					<ToggleButton
						value="popular"
						onClick={(event, value) => onCategoryChange(event, value)}
					>
						Popular
					</ToggleButton>
					<ToggleButton
						value="top_rated"
						onClick={(event, value) => onCategoryChange(event, value)}
					>
						Top Rated
					</ToggleButton>
					<ToggleButton
						value="now_playing"
						onClick={(event, value) => onCategoryChange(event, value)}
					>
						Now Playing
					</ToggleButton>
					<ToggleButton
						value="upcoming"
						onClick={(event, value) => onCategoryChange(event, value)}
					>
						Upcoming
					</ToggleButton>
				</StyledToggleButtonGroup>
			</ButtonGroupWrapper>
		</HeaderWrapper>
	);
};

export { MoviesHeader };
