import { Breadcrumbs } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "@components/link/link";
import styled from "styled-components";

const StyledBreadcrumbs = styled(Breadcrumbs)`
	&& {
		.MuiBreadcrumbs-separator {
			color: white;
		}
	}
`;

const CustomBreadcrumbs = () => {
	const location = useLocation();
	const paths = location.pathname.split("/").filter((path) => path);
	paths.unshift("Home");

	return (
		<StyledBreadcrumbs separator="/" aria-label="breadcrumb">
			{paths.map((path, index) => {
				const routeTo = `/${paths.slice(1, index + 1).join("/")}`;
				return (
					<Link
						underline="hover"
						key={path}
						color="white"
						href={index === 0 ? "/" : routeTo}
					>
						{index === 0
							? "Home"
							: path.charAt(0).toUpperCase() + path.slice(1)}
					</Link>
				);
			})}
		</StyledBreadcrumbs>
	);
};

export { CustomBreadcrumbs };
