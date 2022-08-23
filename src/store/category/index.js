import StateModule from '../module';

class CategoryState extends StateModule {
	initState() {
		return {
			categories: [{ _id: 'all', title: 'Все' }],
		};
	}

	async getCategories() {
		const response = await fetch('api/v1/categories');
		const json = await response.json();

		const categoriesArray = [
			this.initState().categories[0],
			...json.result.items,
		];

		this.setState({
			...this.getState(),
			categories: categoriesArray,
		});
	}
}

export default CategoryState;
