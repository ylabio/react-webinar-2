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
   * Добавление товара в корзину
   * @param code {number}
   */
  addItemToCart(code) {
    const inCart = this.state.cartItems.map((item) => item.code);

    if (!inCart.includes(code)) {
      console.log(code);
      const [test] = this.state.items.filter((item) => item.code === code);
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems, {...test, amount: 1}],
      });
    } else {
      this.state.cartItems.forEach((item) => {
        if (item.code === code) {
          item.amount += 1;
          this.setState({
            ...this.state,
            cartItems: [...this.state.cartItems],
          });
        }
      });
    }
  }

  /**
   * Добавление товара в корзину
   * @param code {number}
   */
  deleteCartItems(code){
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter((item) => item.code !== code),
    });
  }
}

export default Store;
