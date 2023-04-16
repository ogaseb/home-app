import { configureStore } from "@reduxjs/toolkit";
import showsStore from "@stores/shows_store/shows_store";
import uiStore from "@stores/ui_store/ui_store";

export const appStore = configureStore({
	reducer: {
		ui: uiStore,
		shows: showsStore,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
