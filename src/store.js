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
   * Создание записи
   */
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
    });
  }

	/**
	 * Добавление записи в массив cartItems
	 * @param code
	 */
	addToCartItem(item) {
		this.setState({
			...this.state,
			cartItems: 
				!this.state.cartItems.some(cartItem => cartItem.code === item.code) ? 
          [...this.state.cartItems, {...item, totalCount: 1}] : 
					this.state.cartItems.map(cartItem => {
						if(cartItem.code === item.code) {
							return {...cartItem, totalCount: cartItem.totalCount + 1};
						}
						return cartItem;
					})
		});
	}
}

export default Store;
