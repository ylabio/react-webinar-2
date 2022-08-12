import StateModule from '../module';

class ProductState extends StateModule {
	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			item: null,
		};
	}

	async load(id) {
		const response = await fetch(
			`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`,
		);
		const json = await response.json();
		this.setState(
			{ item: json.result },
			`Получение продукта "${json.result.title}"`,
		);
	}

	reset() {
		this.setState({ item: null }, 'Сброс продукта');
	}
}

export default ProductState;
