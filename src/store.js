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

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter((item) => item.code !== code),
    });

    this.getTotalPrice();
  }

  /**
   * Добавление товара в корзину
   * @param code
   * @param item
   */
  addToCart(code, item) {
    const alreadyInCart = this.state.cartItems.find(
      (item) => item.code === code
    );

    // если товар ранее уже был добавлен
    if (alreadyInCart) {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map((cartItem) => {
          if (cartItem.code === code) {
            return { ...cartItem, count: cartItem.count + 1 };
          } else {
            return cartItem;
          }
        }),
      });

      // если товар еще не был добавлен
    } else {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.concat({ ...item, count: 1 }),
      });
    }

    this.getTotalPrice();
  }

  getTotalPrice() {
    this.setState({
      ...this.state,
      cartTotalPrice: this.state.cartItems
        .map((item) => item.price * item.count)
        .reduce((sum, current) => sum + current, 0),
    });
  }
}

export default Store;
