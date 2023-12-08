// Import the RTK Query methods from the React-specific entry point
import { RootState } from "@stores/app_store/app_store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TShowsResultUser } from "@stores/shows_store/user_shows/user_shows.types";

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_API_URL}`,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).authStore.accessToken;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		return headers;
	},
});

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQuery,
	tagTypes: ["UserShows"],
	endpoints: (builder) => ({
		userLogin: builder.mutation<{ access_token: string}, string>({
			query: (credential) => ({
				url: "auth/login",
				method: "POST",
				body: { token: credential },
			}),
			transformErrorResponse: (value) => {
				console.log(value)
			}
		}),
		getAllUserShows: builder.query<TShowsResultUser[], void>({
			query: () => "shows/all",
			providesTags: ["UserShows"],
			transformResponse: (rawResult: { shows: TShowsResultUser[] }) => {
				return rawResult.shows;
			},
		}),
		toggleAddUserShow: builder.mutation<void, TShowsResultUser>({
			query: (show) => ({
				url: "shows/add",
				method: "POST",
				body: { show },
			}),
			invalidatesTags: ["UserShows"],
		}),
		toggleWatchedUserShow: builder.mutation<void, TShowsResultUser>({
			query: (show) => ({
				url: "shows/watched",
				method: "POST",
				body: { show },
			}),
			invalidatesTags: ["UserShows"],
		}),
    getYoutubeSearch: builder.mutation< { data: { videos: Record<string, never>[]}}, string>({
			query: ( search ) => ({
				url: "shows/youtube",
				method: "POST",
				body: { show: { title: search } },
			}),
      transformResponse: ({ data : { videos }}) => {
        console.log(videos)
        if(!videos && !videos.length){
          return []
        }
        return videos
      }
		}),
	}),
});

export const {
	useGetAllUserShowsQuery,
	useToggleAddUserShowMutation,
	useToggleWatchedUserShowMutation,
	useUserLoginMutation,
  useGetYoutubeSearchMutation
} = userApi;
