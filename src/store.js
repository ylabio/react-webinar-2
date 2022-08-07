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
   * Удаление товара из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      shoppingCart: this.state.shoppingCart.filter((item) => item.code !== code),
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    if (this.state.shoppingCart.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        shoppingCart: this.state.shoppingCart.map((item) => {
          if (item.code === code)
            return {
              code,
              title: item.title,
              price: item.price,
              amount: item.amount + 1,
            }
          return item;
        }),
      });
    } else {
      const addedItem = this.state.items.find(item => item.code === code);

      this.setState({
        ...this.state,
        shoppingCart:  this.state.shoppingCart.concat({
          code,
          title: addedItem.title,
          price: addedItem.price,
          amount: 1})
      });
    }
  }
}

export default Store;
