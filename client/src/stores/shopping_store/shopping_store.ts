import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TShoppingStoreState } from "./shopping_store.types";

const initialState: TShoppingStoreState = {
	shoppingLists: [],
	shoppingListModalState: false,
};

export const shoppingStore = createSlice({
	name: "shoppingStore",
	initialState,
	reducers: {
		changeShoppingListModalState: (state, action: PayloadAction<boolean>) => {
			state.shoppingListModalState = action.payload;
		},
		addNewShoppingList: (state, action: PayloadAction<{ name: string }>) => {
			state.shoppingLists.push({ name: action.payload.name, productList: [] });
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeShoppingListModalState, addNewShoppingList } =
	shoppingStore.actions;

export default shoppingStore.reducer;
