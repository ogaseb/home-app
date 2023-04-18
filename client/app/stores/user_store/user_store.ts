import {
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jwt-decode";

type TUserStoreState = {
	user?: {
		id: string;
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
			data: { access_token },
		} = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}/login`);

		return access_token;
	},
);

export const userStore = createSlice({
	name: "userStore",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			const { name, email, nickname, id } = jwt(action.payload) as any;
			state.user = { name, email, nickname, id };
			state.accessToken = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
			localStorage.removeItem("user");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userLogin.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			const user = jwt(action.payload) as any;
			const { name, email, nickname, id } = user;
			state.user = { name, email, nickname, id };
			state.accessToken = action.payload;
			state.loading = "succeeded";
			localStorage.setItem("user", JSON.stringify(action.payload));
		});
	},
});

export const { setUser, removeUser } = userStore.actions;

const user = (state: any) => state.userStore.user;
export const checkIfLoggedIn = createSelector([user], (user) => {
	return !!user;
});

export default userStore.reducer;

export { userLogin };
