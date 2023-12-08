import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUiStoreState } from "./ui_store.types";

const initialState: TUiStoreState = {
	showsMenuDrawer: false,
  showTrailerDialog: { title: "", visible: false},
	whichShowsResultsToShow: "tmdb",
	whichShowsUserToShow: null,
	alertMessageQueue: [],
};

export const uiStore = createSlice({
	name: "uiStore",
	initialState,
	reducers: {
		toggleShowsMenuDrawer: (state) => {
			state.showsMenuDrawer = !state.showsMenuDrawer;
		},
    setTrailerDialog: (state, action) => {
			state.showTrailerDialog = action.payload;
		},
		hideShowsMenuDrawer: (state) => {
			state.showsMenuDrawer = false;
		},
		showTmdbShowsResults: (state) => {
			state.whichShowsResultsToShow = "tmdb";
		},
		showUserShowsResults: (state) => {
			state.whichShowsResultsToShow = "user";
		},
		showUserAddedResults: (state) => {
			state.whichShowsUserToShow = "added";
		},
		showUserWatchedResults: (state) => {
			state.whichShowsUserToShow = "watched";
		},
		showUserBothResults: (state) => {
			state.whichShowsUserToShow = null;
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
	hideShowsMenuDrawer,
	showTmdbShowsResults,
	showUserShowsResults,
	showAlert,
	removeAlertFromQueue,
	showUserAddedResults,
	showUserWatchedResults,
	showUserBothResults,
  setTrailerDialog
} = uiStore.actions;

export default uiStore.reducer;
