import StateModule from '../module';

class ProductState extends StateModule {
	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			item: {
				product: {},
				maidIn: {},
				category: {},
			},
		};
	}

	async load(id) {
		const response = await fetch(
			`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`,
		);
		const json = await response.json();
		this.setState(
			{
				item: {
					product: json.result,
					maidIn: json.result.maidIn,
					category: json.result.category,
				},
			},
			`Получение продукта "${json.result.title}"`,
		);
	}

	reset() {
		this.setState(
			{
				item: {
					product: {},
					maidIn: {},
					category: {},
				},
			},
			'Сброс продукта',
		);
	}
}

export default ProductState;
