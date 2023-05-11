import { Grid, Paper } from "@mui/material";
import styled from "styled-components";
import shoppingImg from "@assets/1.png";
import moviesImg from "@assets/3.png";
import othersImg from "@assets/4.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Grid)`
	&& {
		flex-grow: 1;
		height: calc(100vh - ${(props) => props.theme.appBarHeight} - 16px);
		margin-top: 0;
	}
`;

const StyledPaper = styled(Paper)`
	height: 100%;
	position: relative;
	overflow: hidden;
	line-height: 20px;

	&:hover {
		cursor: pointer;
	}
`;

const BackgroundImage = styled.div<{ image: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-image: url(${(props) => props.image});
	background-position: center;
	background-size: cover;
	transition: transform 0.5s ease;
	transform: scale(1);

	&:hover {
		transition: transform 0.5s ease;
		transform: scale(1.02);
	}
`;

const Text = styled.span`
	transition: font-size 0.5s ease;
`;

const mainPanelsArray = [
	{ path: "shopping", image: shoppingImg, display: "Shopping" },
	{ path: "others", image: othersImg, display: "Others" },
	{ path: "shows", image: moviesImg, display: "Movies, Shows & Anime" },
];

const MainPage = () => {
	const navigate = useNavigate();

	const handlePanelClick = (path: string) => {
		navigate(`/${path}`);
	};

	return (
		<Wrapper container columnSpacing={{ xs: 1, md: 2 }} rowSpacing={2}>
			{mainPanelsArray.map((item, index) => (
				<Grid item md={6} xs={12} key={index}>
					<StyledPaper onClick={() => handlePanelClick(item.path)}>
						<BackgroundImage image={item.image}>
							<Text>{item.display}</Text>
						</BackgroundImage>
					</StyledPaper>
				</Grid>
			))}
		</Wrapper>
	);
};

export { MainPage };
