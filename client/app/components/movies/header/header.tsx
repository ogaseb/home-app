import styled from "styled-components";
import { mediaQuery } from "@theme/theme";
import { MoviesHeaderSearch } from "./search/search";
import { MoviesHeaderCategory } from "./category/category";
import { MoviesHeaderMediaType } from "./media_type/media_type";
import { MoviesHeaderProvider } from "./provider/provider";

const HeaderWrapper = styled.div`
	margin: 8px 0px;
	display: flex;
	flex-direction: row;

	${mediaQuery("largeHandset")`
		flex-wrap: wrap;
	`}
`;

const MoviesHeader = () => {
	return (
		<HeaderWrapper>
			<MoviesHeaderCategory />
			<MoviesHeaderMediaType />
			<MoviesHeaderProvider />
			<MoviesHeaderSearch />
		</HeaderWrapper>
	);
};

export { MoviesHeader };
