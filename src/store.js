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
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   * @param item
   */

  addItemToCart(code, item) {
    const cart = this.state.cart;

    if (cart.find((item) => item.code === code) === undefined) {
      this.setState({
        ...this.state,
        cart: [...cart, { ...item, amount: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        cart: cart.map((item) => {
          return item.code === code ? { ...item, amount: ++item.amount } : item;
        }),
      });
    }
  }

  /**
   *Вычисление суммы всех товаров в корзине
   * @returns {number}
   */

  sumInCart() {
    return this.state.cart.reduce(
      (partialSum, item) => partialSum + item.price * item.amount,
      0
    );
  }
}

export default Store;
