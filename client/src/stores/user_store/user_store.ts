import {
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createSlice,
	isAnyOf,
} from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jwt-decode";

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

const userLogin = createAsyncThunk(
	"user/userLogin",
	async ({ credentialResponse }: { credentialResponse: any }) => {
		const {
			data: { access_token },
		} = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
			token: credentialResponse.credential,
		});

		return access_token;
	},
);

const getUserById = createAsyncThunk(
	"user/getUsers",
	async ({ id }: { id: number }) => {
		const {
			data: { user },
		} = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}/details`);

		return user;
	},
);

export const userStore = createSlice({
	name: "userStore",
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<string>) => {
			const { name, email, nickname, id } = jwt(action.payload) as any;
			state.user = { name, email, nickname, id };
			state.accessToken = action.payload;
		},
		logOut: (state) => {
			state.user = null;
			localStorage.removeItem("user");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userLogin.fulfilled, (state, action) => {
			const user = jwt(action.payload) as any;
			const { name, email, nickname, id } = user;
			state.user = { name, email, nickname, id };
			state.accessToken = action.payload;
			state.loading = "succeeded";
			localStorage.setItem("user", JSON.stringify(action.payload));
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${action.payload?.replace(/"/g, "")}`;
		});

		builder.addCase(getUserById.fulfilled, (state, action) => {
			console.log(action.payload);
		});

		builder.addMatcher(
			isAnyOf(userLogin.pending, getUserById.pending),
			(state) => {
				state.loading = "pending";
			},
		);
		builder.addMatcher(
			isAnyOf(userLogin.rejected, getUserById.rejected),
			(state) => {
				state.loading = "failed";
			},
		);
	},
});

export const { signIn, logOut } = userStore.actions;

const user = (state: { userStore: { user: TUserStoreState["user"] } }) =>
	state.userStore.user;

export const checkIfLoggedIn = createSelector([user], (user) => {
	return !!user;
});

export default userStore.reducer;

export { userLogin, getUserById };
