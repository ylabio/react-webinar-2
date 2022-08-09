//Local
import { computeTotalPrice } from './utils';

class Store {
	constructor(initState) {
		// Состояние приложения (данные)
		this.state = initState;
		// Слушатели изменений state
		this.listeners = [];
	}

	/**
	 * Выбор state
	 * @return {Object}
	 */
	getState() {
		return this.state;
	}

	/**
	 * Установка state
	 * @param newState {Object}
	 */
	setState(newState) {
		this.state = newState;
		// Оповещаем всех подписчиков об изменении стейта
		for (const listener of this.listeners) {
			listener();
		}
	}

	/**
	 * Подписка на изменение state
	 * @param callback {Function}
	 * @return {Function} Функция для отписки
	 */
	subscribe(callback) {
		this.listeners.push(callback);
		// Возвращаем функцию для удаления слушателя
		return () => {
			this.listeners = this.listeners.filter((item) => item !== callback);
		};
	}

	/**
	 * Добавление объекта в корзину
	 * @param item {object} текущая вещь
	 */
	addItemToCart(item) {
		const cartItems = this.state.cart.items;
		const index = cartItems.findIndex(
			(cartItem) => cartItem.code === item.code,
		);
		const currCartItem = cartItems[index];

		const items =
			index === -1 // Если данная вещь еще не была в корзине
				? [...cartItems, { ...item, count: 1 }]
				: [
						...cartItems.slice(0, index),
						{ ...currCartItem, count: currCartItem.count + 1 }, //Если вещь уже имеется - увеличиваем count
						...cartItems.slice(index + 1),
				  ];

		this.setState({
			...this.state,
			cart: {
				...this.state.cart,
				items,
			},
		});
	}

	/**
	 * Добавление объекта в корзину
	 * @param item {object} текущая вещь
	 */
	deleteItemFromCart(item) {
		const items = this.state.cart.items.filter(
			(cartItem) => cartItem.code !== item.code,
		);

		this.setState({
			...this.state,
			cart: {
				...this.state.cart,
				items,
			},
		});
	}
}

export default Store;
