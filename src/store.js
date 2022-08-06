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

	totalPrice() {
		return this.state.cartItems.reduce(
			(quantity, item) => item.price * item.quantity + quantity,
			0,
		);
	}

	/**
	 * @param code
	 * @param item
	 */
	addToCart(code, item) {
		const cartItems = this.state.cartItems;

		if (cartItems.find((item) => item.code === code) == null) {
			this.setState({
				...this.state,
				cartItems: [...cartItems, { ...item, quantity: 1 }],
			});
		} else {
			this.setState({
				...this.state,
				cartItems: cartItems.map((item) => {
					if (item.code === code) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				}),
			});
		}
	}

	/**
	 * @param code
	 */
	deleteFromCart(code) {
		this.setState({
			...this.state,
			cartItems: this.state.cartItems.filter((item) => item.code !== code),
		});
	}
}

export default Store;
