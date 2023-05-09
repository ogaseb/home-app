import { shoppingStore } from "@stores/shopping_store/shopping_store";

describe("shoppingStore", () => {
	it("should toggle shoppingListModalState", () => {
		const initialState = { shoppingListModalState: false, shoppingLists: [] };
		const action = {
			type: "shoppingStore/changeShoppingListModalState",
			payload: true,
		};
		const newState = shoppingStore.reducer(initialState, action);
		expect(newState.shoppingListModalState).toEqual(true);
	});

	it("should add new shopping list", () => {
		const initialState = { shoppingListModalState: false, shoppingLists: [] };
		const action = {
			type: "shoppingStore/addNewShoppingList",
			payload: { name: "My list" },
		};
		const newState = shoppingStore.reducer(initialState, action);
		expect(newState.shoppingLists[0].name).toEqual("My list");
		expect(newState.shoppingLists[0].productList).toEqual([]);
	});
});
