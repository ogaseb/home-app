type TShoppingStoreState = {
	shoppingLists: {
		productList: { name: string; quantity: number }[];
		name: string;
	}[];
	shoppingListModalState: boolean;
};

export { TShoppingStoreState };
