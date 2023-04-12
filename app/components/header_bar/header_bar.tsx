import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${(props) => props.theme.colors.primary};
	}
`;

const HeaderBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div>
			<StyledAppBar position="sticky">
				<Toolbar>
					{location.pathname !== "/" && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => navigate(-1)}
						>
							<ArrowBack />
						</IconButton>
					)}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Furry Hideout App
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</StyledAppBar>
		</div>
	);
};

export { HeaderBar };
