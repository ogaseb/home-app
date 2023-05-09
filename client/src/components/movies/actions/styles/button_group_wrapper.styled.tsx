import { mediaQuery } from "@theme/theme";
import styled from "styled-components";

const ButtonGroupWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;

	${mediaQuery("largeHandset")`
		justify-content: start;

		& .MuiToggleButtonGroup-root > button {
			font-size: 12px;
		}
	`}
`;

export { ButtonGroupWrapper };
