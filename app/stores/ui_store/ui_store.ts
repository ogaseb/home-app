import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
