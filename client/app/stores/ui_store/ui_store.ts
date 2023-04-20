import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUiStoreState } from "./ui_store.types";

const initialState: TUiStoreState = {
	menuDrawerState: false,
	whichShowsResultsToShow: "tmdb",
	alertMessageQueue: [],
};

export const uiStore = createSlice({
	name: "uiStore",
	initialState,
	reducers: {
		toggleMenuDrawer: (state) => {
			state.menuDrawerState = !state.menuDrawerState;
		},
		showTmdbShowsResults: (state) => {
			state.whichShowsResultsToShow = "tmdb";
		},
		showUserShowsResults: (state) => {
			state.whichShowsResultsToShow = "user";
		},
		showAlert: (
			state,
			action: PayloadAction<{
				message: string;
				severity: "success" | "error";
			}>,
		) => {
			state.alertMessageQueue.push({
				message: action.payload.message,
				severity: action.payload.severity,
			});
		},
		removeAlertFromQueue: (state) => {
			state.alertMessageQueue.shift();
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	toggleMenuDrawer,
	showTmdbShowsResults,
	showUserShowsResults,
	showAlert,
	removeAlertFromQueue,
} = uiStore.actions;

export default uiStore.reducer;
