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

  addCart(code, item) {
    const ifInCart = this.state.cart.find((item) => item.code === code);

    if (ifInCart) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((value) => {
          if (value.code === code) {
            return { ...value, amount: value.amount + 1 };
          } else {
            return value;
          }
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({ ...item, amount: 1 }),
      });
    }
  }
  deleteCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
    });
  }
}

export default Store;
