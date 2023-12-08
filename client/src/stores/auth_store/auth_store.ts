import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@services/api/user_api/user_api";
import "core-js/stable/atob";

type TUserStoreState = {
	user: {
		id: number;
		name?: string;
		email?: string;
		nickname?: string;
	} | null;
	accessToken?: string;
	loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: TUserStoreState = {
	user: null,
	accessToken: "",
	loading: "idle",
};

export const authStore = createSlice({
	name: "authStore",
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<string>) => {
			const { name, email, nickname, id } = jwtDecode<{name: string, email: string, nickname: string, id: number}>(action.payload);
			state.user = { name, email, nickname, id };
			state.accessToken = action.payload;
		},
		logOut: (state) => {
			state.user = null;
			localStorage.removeItem("user");
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.userLogin.matchFulfilled,
			(state, { payload }) => {
				const { name, email, nickname, id } = jwtDecode<{name: string, email: string, nickname: string, id: number}>(payload.access_token);
				state.user = { name, email, nickname, id };
				state.accessToken = payload.access_token;
				localStorage.setItem("user", JSON.stringify(payload.access_token));
			},
		);
	},
});

export const { signIn, logOut } = authStore.actions;
export default authStore.reducer;
