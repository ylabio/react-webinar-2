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

  addItemToCart({ code, title, price }) {
    const number = this.state.cart.find((item) => {
      return item.code === code;
    });

    if (!number)
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({ code, title, price, quantity: 1 }),
      });
    else
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) => {
          return item.code === code
            ? { ...item, quantity: ++item.quantity }
            : item;
        }),
      });
  }

  deleteItemFromCart({ code }) {
    const target = this.state.cart.find((item) => item.code === code);

    if (target.quantity === 1)
      this.setState({
        ...this.state,
        cart: this.state.cart.filter((item) => item.code !== code),
      });
    else
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) => {
          return item.code === code
            ? { ...item, quantity: --item.quantity }
            : item;
        }),
      });
  }

  toggleCartVisibility() {
    this.setState({
      ...this.state,
      cartVisibility: !this.state.cartVisibility,
    });
  }
}

export default Store;
