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
   * Добавление товара
   */
  addItemToCart(code) {
    const itemInCart = this.state.cartItems.filter(item => item.code === code).length === 0 ? false : true
    this.setState({
      ...this.state,
      cartItems: itemInCart
      ? this.state.cartItems.map(item => item.code === code ? item.count++ && item : item)
      : [
        ...this.state.cartItems,
        ...this.state.items.filter(item => item.code === code).map(item => ({...item, count: 1}))
      ]
    });
  }

  /**
   * Удаление товара по его коду
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code)
    });
  }
}

export default Store;