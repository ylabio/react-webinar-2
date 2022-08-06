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

  addToCart(item) {
    let findItem = this.state.cart.items.find(i => i.code === item.code);
    this.setState({
      ...this.state,
      cart: {
        items: findItem
          ? this.state.cart.items.map((item) =>
              item.code === findItem.code ? { ...item, count: item.count + 1 } : item,
            )
          : this.state.cart.items.concat(item),
        summ: this.state.cart.summ + item.price,
      },
    });
  }
  
   deleteItem(code) {
    const deletedItem = this.state.cart.items.find(item => item.code === code);
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter((item) => item.code !== code),
        summ: this.state.cart.summ - deletedItem.count * deletedItem.price,
      },
    });
  }
}

export default Store;
