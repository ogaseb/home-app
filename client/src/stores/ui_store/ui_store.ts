import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUiStoreState } from "./ui_store.types";

const initialState: TUiStoreState = {
	showsMenuDrawer: false,
	whichShowsResultsToShow: "tmdb",
	alertMessageQueue: [],
};

export const uiStore = createSlice({
	name: "uiStore",
	initialState,
	reducers: {
		toggleShowsMenuDrawer: (state) => {
			state.showsMenuDrawer = !state.showsMenuDrawer;
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
	toggleShowsMenuDrawer,
	showTmdbShowsResults,
	showUserShowsResults,
	showAlert,
	removeAlertFromQueue,
} = uiStore.actions;

export default uiStore.reducer;
