class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Элементы в корзине
    this.state.itemsInCart = [];
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

  // Добавление элемента в корзину
  addItemToCart(code) {
    const addedItem = this.state.items.find(item => item.code === code);
    if (!this.state.itemsInCart.find(item => item.code === code)) {
      this.setState({
        ...this.state,
        itemsInCart: [
          ...this.state.itemsInCart,
          {...addedItem, count: 1, number: 1 }
        ]
      })
    } else {
      this.setState({
        ...this.state,
        itemsInCart: this.state.itemsInCart.map(item => {
          return item.code === code ? {...item, count: item.count+1} : item;
        })
      })
    }
  }

  // Удаление элемента из корзины
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      itemsInCart: this.state.itemsInCart.filter(item => item.code !== code)
    });
  }
}

export default Store;
