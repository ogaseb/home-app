// Import the RTK Query methods from the React-specific entry point
import { RootState } from "@stores/app_store/app_store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_API_URL}shows/`,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).userStore.accessToken;
		console.log(token);

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

export const userShowsApiSlice = createApi({
	reducerPath: "userShowsApi",
	baseQuery: baseQuery,
	tagTypes: ["UserShows"],
	endpoints: (builder) => ({
		getAllUserShows: builder.query<TShowsResultUser[], void>({
			query: () => "all",
			providesTags: ["UserShows"],
			transformResponse: (rawResult: { shows: TShowsResultUser[] }) => {
				return rawResult.shows;
			},
		}),
		toggleAddUserShow: builder.mutation<void, TShowsResultUser>({
			query: (show) => ({
				url: "add",
				method: "POST",
				body: { show },
			}),
			invalidatesTags: ["UserShows"],
		}),
		toggleWatchedUserShow: builder.mutation<void, TShowsResultUser>({
			query: (show) => ({
				url: "watched",
				method: "POST",
				body: { show },
			}),
			invalidatesTags: ["UserShows"],
		}),
	}),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
	useGetAllUserShowsQuery,
	useToggleAddUserShowMutation,
	useToggleWatchedUserShowMutation,
} = userShowsApiSlice;
