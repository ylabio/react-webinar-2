import counter from '../../utils/counter';
import StateModule from '../module';

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {
	#apiBaseUrl = '/api/v1/articles/';

	#loading() {
		this.setState(
			{
				...this.getState(),
				isLoading: true,
			},
			'Loading...',
		);
	}
	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			items: [],
			currItem: null,
			currPage: 1,
			totalPages: 0,
			limit: 10,
			skip: 0,
			isLoading: true,
		};
	}

	async load() {
		this.#loading();
		const { limit, skip } = this.getState();

		try {
			const response = await fetch(
				`${
					this.#apiBaseUrl
				}?limit=${limit}&skip=${skip}&fields=items(*),count`,
			);

			const { result } = await response.json();

			this.setState(
				{
					...this.getState(),
					items: result.items,
					item: null,
					totalPages: Math.ceil(result.count / limit),
					isLoading: false,
				},
				'Загрузка данных',
			);
		} catch (error) {
			console.log(error);
			throw new Error('Error during request');
		}
	}

	async selectItem(id) {
		this.#loading();
		try {
			const response = await fetch(
				`${
					this.#apiBaseUrl
				}${id}?fields=*,maidIn(title,code),category(title)`,
			);
			const { result: currItem } = await response.json();

			this.setState(
				{
					...this.getState(),
					currItem,
					isLoading: false,
				},
				'Выбрать товар',
			);
		} catch (error) {
			console.log(error);
			throw new Error('Error during request');
		}
	}

	selectPage(page) {
		const { limit } = this.getState();
		const skip = page * limit;
		this.setState(
			{
				...this.getState(),
				skip,
				currPage: Math.ceil(skip / limit) + 1,
			},
			'Выбрать страницу',
		);
	}

	/**
	 * Создание записи
	 */
	createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
		this.setState(
			{
				items: this.getState().items.concat({
					_id,
					title,
					price,
					selected,
				}),
			},
			'Создание товара',
		);
	}

	/**
	 * Удаление записи по её коду
	 * @param _id
	 */
	deleteItem(_id) {
		this.setState(
			{
				items: this.getState().items.filter((item) => item._id !== _id),
			},
			'Удаление товара',
		);
	}
}

export default CatalogState;
