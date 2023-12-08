type TUiStoreState = {
	showsMenuDrawer: boolean;
  showTrailerDialog: { title: string, visible: boolean };
	whichShowsResultsToShow: "tmdb" | "user";
	whichShowsUserToShow: "added" | "watched" | null;
	alertMessageQueue: {
		message: string;
		severity: "error" | "success" | "warning" | "info";
	}[];
};

export { TUiStoreState };
