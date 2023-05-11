import styled from "styled-components";
import { mediaQuery } from "@theme/theme";

const MoviesListWrapper = styled.div`
	position: relative;
	color: white;
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - ${(props) => props.theme.appBarHeight});

	& > div:nth-child(even) {
		background-color: #171717;
	}

	@media only screen and (max-width: 480px) {
		height: calc(100vh - ${(props) => props.theme.appBarHeight} - 186px);
	}
`;

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
`;

const ErrorText = styled.div`
	color: white;
	font-size: 36px;
	text-align: center;
	margin-bottom: 8px;

	${mediaQuery("largeHandset")`
    font-size: 24px;
	`}
`;

const FlexCenterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const MoviesListError = () => {
	return (
		<MoviesListWrapper>
			<FlexCenterWrapper>
				<ErrorWrapper>
					<ErrorText>There is no movies to show</ErrorText>
				</ErrorWrapper>
			</FlexCenterWrapper>
		</MoviesListWrapper>
	);
};

export { MoviesListError };
