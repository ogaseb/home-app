import { ToggleButton } from "@mui/material";
import styled from "styled-components";

const StyledToggleButton = styled(ToggleButton)`
	&& {
		width: 100%;
		color: #1976d2;
		border: 1px solid rgba(25, 118, 210, 0.5);
		border-radius: 4px;
		height: 32px;
		line-height: 12px;
		font-size: 12px;
		transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

		&:hover {
			border: 1px solid #1976d2;
		}
	}
`;

export { StyledToggleButton };
