import { HeaderBar } from "@components/header_bar/header_bar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const OutletWrapper = styled.div`
	margin: 16px 16px 0;
	height: calc(100vh - ${(props) => props.theme.appBarHeight});
`;
const RootPage = () => {
	return (
		<>
			<HeaderBar />
			<OutletWrapper>
				<Outlet />
			</OutletWrapper>
		</>
	);
};

export { RootPage };
