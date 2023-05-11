import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const StyledPaper = styled(Paper)`
	&& {
		height: 200px;
		cursor: pointer;
		color: black;
	}
`;

const ShoppingListPage = () => {
	const { id } = useParams();
	const { shoppingLists } = useAppSelector((state) => state.shoppingStore);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const onClick = (id: number) => {
		navigate(`/shopping/${id}`);
	};
	return <StyledPaper>{id}</StyledPaper>;
};

export default ShoppingListPage;
