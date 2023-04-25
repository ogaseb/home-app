type TUiStoreState = {
	menuDrawerState: boolean;
	whichShowsResultsToShow: "tmdb" | "user";
	alertMessageQueue: {
		message: string;
		severity: "error" | "success" | "warning" | "info";
	}[];
};

export { TUiStoreState };
