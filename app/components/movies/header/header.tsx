import styled from "styled-components";
import { useAppDispatch } from "@hooks/hooks";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {
	Controller,
	SubmitHandler,
	Control,
	UseFormHandleSubmit,
} from "react-hook-form";
import {
	searchByQuery,
	showTopRated,
	showPopular,
} from "@stores/movies_store/movies_store";
import { TFormInput } from "@pages/movies_page/movies_page.types";
import { ButtonGroup } from "@mui/material";
import { mediaQuery } from "@theme/theme";

const HeaderWrapper = styled.div`
	margin: 8px 0px;
	display: flex;
	flex-direction: row-reverse;

	${mediaQuery("largeHandset")`
		flex-wrap: wrap;
	`}
`;

const StyledForm = styled.form`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: end;

	margin-bottom: 8px;

	${mediaQuery("largeHandset")`
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
`;

const StyledInput = styled(Input)`
	background-color: rgba(25, 118, 210, 0.04);
	border: 1px solid #1976d2;
	border-radius: 4px;
	padding: 0 8px;

	.MuiInput-input {
		color: white;
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

	const onSubmit: SubmitHandler<TFormInput> = (data) => {
		dispatch(searchByQuery({ query: data.movieName, page: 1 }));
	};

	return (
		<HeaderWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="movieName"
					control={control}
					render={({ field }) => <StyledInput {...field} />}
				/>
				<Button type="submit" variant="outlined">
					Submit
				</Button>
			</StyledForm>
			<ButtonGroupWrapper>
				<ButtonGroup>
					<Button variant="outlined" onClick={() => dispatch(showPopular(1))}>
						Popular
					</Button>
					<Button variant="outlined" onClick={() => dispatch(showTopRated(1))}>
						Top Rated
					</Button>
				</ButtonGroup>
			</ButtonGroupWrapper>
		</HeaderWrapper>
	);
};

export { MoviesHeader };
