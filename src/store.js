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
	 * Установка нового значения корзины
	 * @param newBasket
	 */
  setBasket(newBasket) {
    this.setState({
      ...this.state,
      basket: newBasket
    });
  }

	/**
	 * Добавления нового элемента в корзину
	 * @param item
	 */
  addInBasket(item) {
    const basket = this.state.basket;
    let newBasket = [];
    if (!basket.some(el => el.code === item.code)) {
      item.count = 1;
      newBasket=[...basket, item];
    } else {
      item.count++;
      newBasket=basket;
    }

    this.setBasket(newBasket);
  }

	/**
	 * Удаление элемента из корзины
	 * @param code
	 */
  deleteFromBasket(code) {
    this.setBasket(this.state.basket.filter(elem => elem.code !== code))
  }
}

export default Store;
