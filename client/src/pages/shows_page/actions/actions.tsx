import styled from "styled-components";
import { mediaQuery } from "@theme/theme";
import { MoviesHeaderCategory } from "./category/category";
import { MoviesHeaderMediaType } from "./media_type/media_type";
import { MoviesHeaderProvider } from "./provider/provider";
import { MoviesHeaderSearch } from "./search/search";
import { MoviesHeaderUser } from "./user/user";

const HeaderWrapper = styled.div`
	margin: 8px 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${mediaQuery("largeHandset")`
		flex-wrap: wrap;
	`}
`;

const MoviesActions = () => {
	return (
		<HeaderWrapper>
			<MoviesHeaderSearch />
			<MoviesHeaderCategory />
			<MoviesHeaderMediaType />
			<MoviesHeaderProvider />
			<MoviesHeaderUser />
		</HeaderWrapper>
	);
};

export { MoviesActions };
