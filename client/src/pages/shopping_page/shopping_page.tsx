import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { ShoppingListDialog } from "@pages/shopping_page/dialogs/shopping_list_dialog";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { changeShoppingListModalState } from "@stores/shopping_store/shopping_store";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)`
	height: 200px;
	cursor: pointer;
`;

const ShoppingPage = () => {
	const { shoppingLists } = useAppSelector((state) => state.shoppingStore);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const onClick = (id: number) => {
		navigate(`/shopping/${id}`);
	};
	return (
		<div>
			<ShoppingListDialog />
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: "absolute", bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}
			>
				<SpeedDialAction
					icon={<AddIcon />}
					onClick={() => dispatch(changeShoppingListModalState(true))}
				/>
				<SpeedDialAction icon={<RefreshIcon />} />
			</SpeedDial>
			<Grid container spacing={2}>
				{shoppingLists.map((list, index) => (
					<Grid key={index} item xs={6} sm={3} md={2}>
						<StyledPaper onClick={() => onClick(index)}>
							{list.name}
						</StyledPaper>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ShoppingPage;
