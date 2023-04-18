import { createSlice } from "@reduxjs/toolkit";
import { TUiStoreState } from "./ui_store.types";

const initialState: TUiStoreState = {
	menuDrawerState: false,
};

export const uiStore = createSlice({
	name: "uiStore",
	initialState,
	reducers: {
		toggleMenuDrawer: (state) => {
			state.menuDrawerState = !state.menuDrawerState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleMenuDrawer } = uiStore.actions;

export default uiStore.reducer;
