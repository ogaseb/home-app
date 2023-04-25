import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const FlexCenterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;

const ProgressSpinner = ({ size = 22 }: { size?: number }) => {
	return (
		<FlexCenterWrapper>
			<CircularProgress size={size} />
		</FlexCenterWrapper>
	);
};

export { ProgressSpinner };
