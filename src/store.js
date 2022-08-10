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
   * Добавления товара в корзину
   */
  addItemToCart(item) {
    if (!this.state.itemsCart.length || !this.state.itemsCart.find(i => i.code === item.code)) {
      this.setState({
        ...this.state,
        itemsCart: [...this.state.itemsCart, { ...item, count: 1 }],
        sumItemsInCart: this.state.sumItemsInCart + item.price,
        uniqueItemsInCart: this.state.uniqueItemsInCart + 1
      })
    } else {
      this.setState({
        ...this.state,
        itemsCart: this.state.itemsCart.map(itemCart => {
          if (itemCart.code === item.code) {
            return { ...itemCart, count: itemCart.count + 1 }
          } else {
            return itemCart;
          }
        }),
        sumItemsInCart: this.state.sumItemsInCart + item.price,
      })
    }
  }
  removeItemToCart(item) {
    this.setState({
      ...this.state,
      itemsCart: this.state.itemsCart.filter(itemCart => itemCart.code !== item.code),
      sumItemsInCart: this.state.sumItemsInCart - item.price * (item.count),
      uniqueItemsInCart: this.state.uniqueItemsInCart - 1
    })
  }
}

export default Store;
