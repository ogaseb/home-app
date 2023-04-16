import { createSlice } from "@reduxjs/toolkit";

interface IuiStoreState {
	menuDrawerState: boolean;
}

const initialState: IuiStoreState = {
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
