import { configureStore } from "@reduxjs/toolkit";
import moviesStore from "@stores/movies_store/movies_store";
import uiStore from "@stores/ui_store/ui_store";

export const appStore = configureStore({
	reducer: {
		ui: uiStore,
		movies: moviesStore,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
