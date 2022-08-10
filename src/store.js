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
   * Удаление записи по её коду
   * и тут же запись общей суммы и количества уникального товара
   * @param code
   */
  deleteItemFromCart(code) {
    const cartItemsAfterDelete = this.state.cartItems.filter(item => item.code !== code)
    this.setState({
      ...this.state,
      cartItems: cartItemsAfterDelete,
      cartPriceSum: this.calcCartSumPrice(cartItemsAfterDelete),
      cartUniqueCount: this.calcCartUniqueCount(cartItemsAfterDelete)
    });
  }

  /**
   * Добавление записи по её коду
   * и тут же запись общей суммы и количества уникального товара
   * @param code
   */
  addItemToCart(code) {
    const cartItemsAfterAdd = this.state.cartItems.concat(this.state.items.find(item => item.code === code))
    this.setState({
      ...this.state,
      cartItems: cartItemsAfterAdd,
      cartPriceSum: this.calcCartSumPrice(cartItemsAfterAdd),
      cartUniqueCount: this.calcCartUniqueCount(cartItemsAfterAdd)
    });
  }

  calcCartSumPrice(state) {
    return state.map(i => i.price).reduce((a, b) => (a + b), 0)
  }

  calcCartUniqueCount(state) {
    return Array.from(new Set(state)).length
  }

  getSummaryPrice() {
    return this.state.cartPriceSum
  }

  getTotalUniqueCount() {
    return this.state.cartUniqueCount
  }

}

export default Store;
