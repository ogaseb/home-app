import { ToggleButtonGroup } from "@mui/material";
import styled from "styled-components";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
	&& {
		width: 100%;

		.MuiToggleButton-root {
			color: #1976d2;
		}

		.MuiToggleButton-root:hover {
			border: 1px solid #1976d2;
		}

		.MuiToggleButtonGroup-grouped:not(:first-of-type).Mui-selected {
			border-left: 1px solid #1976d2;
		}

		.MuiToggleButtonGroup-grouped:not(
				:first-of-type
			).Mui-disabled.Mui-selected {
			border-left: 1px solid rgba(122, 122, 122, 0.5);
		}

		.Mui-selected {
			border: 1px solid #1976d2;
			background-color: rgb(33, 33, 33);
		}

		.Mui-disabled {
			border: 1px solid rgba(122, 122, 122, 0.5);
			color: rgba(122, 122, 122, 0.5);
		}

		.MuiButtonBase-root {
			width: 100%;
		}
	}
`;

export { StyledToggleButtonGroup };
