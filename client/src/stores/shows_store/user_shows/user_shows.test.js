import userShowsReducer, {
	setSearchShows,
	toggleAddUserShow,
	getAllUserShows,
	toggleWatchedUserShow,
	addedUserResults,
	userShowsArray,
	selectedCurrentMediaType,
} from "./user_shows";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

jest.mock("axios");

describe("userShows", () => {
	describe("addedUserResults fn", () => {
		const mediaType = "movie";

		const state = {
			showsStore: {
				userShows: {
					shows: {
						results: [
							{
								id: 1,
								isAdded: true,
								mediaType: "movie",
								name: "Some Movie",
							},
							{
								id: 2,
								isAdded: false,
								mediaType: "tv",
								name: "Some TV Show",
							},
							{
								id: 3,
								isAdded: true,
								mediaType: "movie",
								name: "Another Movie",
							},
						],
					},
				},
				tmdbShows: {
					currentMediaType: mediaType,
				},
			},
		};

		it("should return only the added user results for the selected media type", () => {
			const expectedResult = [
				{
					id: 1,
					isAdded: true,
					mediaType: "movie",
					name: "Some Movie",
				},
				{
					id: 3,
					isAdded: true,
					mediaType: "movie",
					name: "Another Movie",
				},
			];
			expect(
				addedUserResults.resultFunc(
					state.showsStore.userShows.shows.results,
					mediaType,
				),
			).toEqual(expectedResult);
		});
	});

	describe("user shows api calls", () => {
		let store;

		beforeEach(() => {
			store = mockStore({});
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		it("should fetch shows from API and return them", async () => {
			const mockResponse = {
				data: {
					shows: [],
				},
			};

			axios.get.mockResolvedValueOnce(mockResponse);

			await store.dispatch(getAllUserShows());

			const actions = store.getActions();

			expect(actions[0].type).toEqual("user/getAllUserShows/pending");
			expect(actions[1].type).toEqual("user/getAllUserShows/fulfilled");
			expect(actions[1].payload).toEqual(mockResponse.data.shows);
		});

		it("should handle errors while fetching shows", async () => {
			const error = {
				response: {
					status: 404,
					data: {
						message: "Show not found",
					},
				},
			};

			axios.get.mockRejectedValueOnce(error);

			await store.dispatch(getAllUserShows());

			const actions = store.getActions();

			expect(actions[0].type).toEqual("user/getAllUserShows/pending");
			expect(actions[1].type).toEqual("user/getAllUserShows/rejected");
			expect(actions[1].error.message).toEqual(error.response.data.message);
		});

		it("should post watched flag to API", async () => {
			const mockResponse = {
				data: {
					shows: [],
				},
			};

			const show = {
				id: 123,
				name: "Fake Show",
			};

			axios.post.mockResolvedValueOnce(mockResponse);
			await store.dispatch(toggleWatchedUserShow({ show }));
			const actions = store.getActions();

			expect(actions[0].type).toEqual("user/toggleWatchedUserShow/pending");
			expect(actions[1].type).toEqual("user/toggleWatchedUserShow/fulfilled");
		});

		it("should handle errors while posting watched flag", async () => {
			const error = {
				response: {
					status: 401,
					data: {
						message: "Could not authenticate",
					},
				},
			};

			const show = {
				id: 123,
				name: "Fake Show",
			};

			axios.get.mockRejectedValueOnce(error);

			await store.dispatch(toggleWatchedUserShow({ show }));

			const actions = store.getActions();

			expect(actions[0].type).toEqual("user/toggleWatchedUserShow/pending");
			expect(actions[1].type).toEqual("user/toggleWatchedUserShow/rejected");
			expect(actions[1].error.message).toEqual(error.response.data.message);
		});

		it("should post added flag to API", async () => {
			const mockResponse = {
				data: {
					shows: [],
				},
			};

			const show = {
				id: 123,
				name: "Fake Show",
			};

			axios.post.mockResolvedValueOnce(mockResponse);
			await store.dispatch(toggleAddUserShow({ show }));
			const actions = store.getActions();

			expect(actions[0].type).toEqual("user/toggleAddUserShow/pending");
			expect(actions[1].type).toEqual("user/toggleAddUserShow/fulfilled");
		});

		it("should handle errors while posting added flag", async () => {
			const error = {
				response: {
					status: 401,
					data: {
						message: "Could not authenticate",
					},
				},
			};

			const show = {
				id: 123,
				name: "Fake Show",
			};

			axios.get.mockRejectedValueOnce(error);

			await store.dispatch(toggleAddUserShow({ show }));

			const actions = store.getActions();

			expect(actions[0].type).toEqual("user/toggleAddUserShow/pending");
			expect(actions[1].type).toEqual("user/toggleAddUserShow/rejected");
			expect(actions[1].error.message).toEqual(error.response.data.message);
		});
	});

	describe("userShows reducer", () => {
		let state = {
			searchShows: "",
			shows: {
				results: [],
			},
			loading: "",
		};

		it("should handle setSearchShows", () => {
			const action = setSearchShows("test");
			const newState = userShowsReducer(state, action);
			expect(newState.searchShows).toEqual("test");
		});

		it("should handle getAllUserShows.fulfilled", () => {
			const action = getAllUserShows.fulfilled([{ id: 1, name: "test" }]);
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("succeeded");
			expect(newState.shows.results.length).toBeGreaterThan(0);
		});

		it("should handle toggleAddUserShow.pending", () => {
			const action = toggleAddUserShow.pending;
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("pending");
		});

		it("should handle toggleAddUserShow.rejected", () => {
			const action = toggleAddUserShow.rejected;
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("failed");
		});

		it("should handle getAllUserShows.pending", () => {
			const action = getAllUserShows.pending;
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("pending");
		});

		it("should handle getAllUserShows.rejected", () => {
			const action = getAllUserShows.rejected;
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("failed");
		});

		it("should handle toggleWatchedUserShow.pending", () => {
			const action = toggleWatchedUserShow.pending;
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("pending");
		});

		it("should handle toggleWatchedUserShow.rejected", () => {
			const action = toggleWatchedUserShow.rejected;
			const newState = userShowsReducer(state, action);
			expect(newState.loading).toEqual("failed");
		});
	});

	describe("userShowsArray function", () => {
		it("should return an array of user shows", () => {
			const state = {
				showsStore: {
					userShows: { shows: { results: [{ id: 1, title: "The Office" }] } },
				},
			};
			const userShows = userShowsArray(state);
			expect(userShows).toEqual([{ id: 1, title: "The Office" }]);
		});

		it("should return an empty array if there are no user shows", () => {
			const state = { showsStore: { userShows: { shows: { results: [] } } } };
			const userShows = userShowsArray(state);
			expect(userShows).toEqual([]);
		});
	});

	describe("selectedCurrentMediaType function", () => {
		test("returns default media type as movie", () => {
			const state = {
				showsStore: {
					tmdbShows: {
						currentMediaType: "movie",
					},
				},
			};
			expect(selectedCurrentMediaType(state)).toBe("movie");
		});

		test("returns current media type as tv", () => {
			const state = {
				showsStore: {
					tmdbShows: {
						currentMediaType: "tv",
					},
				},
			};
			expect(selectedCurrentMediaType(state)).toBe("tv");
		});
	});
});
