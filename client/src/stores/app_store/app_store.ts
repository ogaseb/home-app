import { configureStore } from "@reduxjs/toolkit";
import shoppingStore from "@stores/shopping_store/shopping_store";
import showsStore from "@stores/shows_store/shows_store";
import uiStore from "@stores/ui_store/ui_store";
import authStore from "@stores/auth_store/auth_store";
import { userApi } from "@services/api/user_api/user_api";
import { TMDBShowsApi } from "@services/api/TMDB_api/TMDB_api";

export const appStore = configureStore({
	reducer: {
		authStore: authStore,
		uiStore: uiStore,
		showsStore: showsStore,
		shoppingStore: shoppingStore,
		[userApi.reducerPath]: userApi.reducer,
		[TMDBShowsApi.reducerPath]: TMDBShowsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			userApi.middleware,
			TMDBShowsApi.middleware,
		]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
