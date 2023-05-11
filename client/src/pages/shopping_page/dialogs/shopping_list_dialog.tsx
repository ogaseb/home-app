import { useState } from "react";
import Button from "@mui/material/Button";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import {
	addNewShoppingList,
	changeShoppingListModalState,
} from "@stores/shopping_store/shopping_store";

const ShoppingListDialog = () => {
	const [name, setName] = useState("");
	const dispatch = useAppDispatch();
	const { shoppingListModalState } = useAppSelector(
		(state) => state.shoppingStore,
	);

	const onCancel = () => {
		dispatch(changeShoppingListModalState(false));
	};

	const onSubmit = () => {
		dispatch(addNewShoppingList({ name }));
		dispatch(changeShoppingListModalState(false));
	};

	return (
		<div>
			<Dialog open={shoppingListModalState} onClose={onCancel}>
				<DialogTitle>Add new list</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Provide a name for you new shopping list.
					</DialogContentText>
					<TextField
						onChange={(e) => setName(e.target.value)}
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancel}>Cancel</Button>
					<Button onClick={onSubmit}>Add</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export { ShoppingListDialog };
