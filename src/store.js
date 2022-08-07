import { calculateTotalPrice } from 'utils.js';

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
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }

	/**
	 * Добавление товара в корзину
	 * @param code
	 */
	addToCartItem(code) {
		const findItem = this.state.items.find(cartItem => cartItem.code === code);

		this.setState({
			...this.state,
			cartItems: 
				!this.state.cartItems.some(cartItem => cartItem.code === code) ? 
          [...this.state.cartItems, {...findItem, totalCount: 1}] : 
					this.state.cartItems.map(cartItem => {
						if(cartItem.code === code) {
							return {...cartItem, totalCount: cartItem.totalCount + 1};
						}
						return cartItem;
					})
		});

		this.getResultsCart();
	}

	/**
	 * Удаление товара из корзины
	 * @param code
	 */
	deleteFromCartItem(code) {
		this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(cartItem => cartItem.code !== code)
		});

		this.getResultsCart();
	}

	/**
	 * Общее количество уникального товара и сумма с учётом всего количества
	 *
	 */
	getResultsCart() {
		this.setState({
			...this.state,
			totalCount: this.state.cartItems.length,
			totalPrice: calculateTotalPrice(this.state.cartItems)
		});
	}
}

export default Store;
