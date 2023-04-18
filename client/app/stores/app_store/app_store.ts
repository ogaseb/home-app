import { configureStore } from "@reduxjs/toolkit";
import tmdbShowsStore from "@stores/tmdb_shows_store/tmdb_shows_store";
import uiStore from "@stores/ui_store/ui_store";
import userStore from "@stores/user_store/user_store";

export const appStore = configureStore({
	reducer: {
		userStore: userStore,
		uiStore: uiStore,
		tmdbShowsStore: tmdbShowsStore,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
