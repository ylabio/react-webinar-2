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
    };
  }

  /**
   * Добавление записи в корзину
   * @param cartItem {Object}
   */
  addToCartItem(cartItem) { 
    const cartItemFound = this.state.cart.cartItems.find(elem => elem.code === cartItem.code);
   
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartItems: cartItemFound ?
          this.state.cart.cartItems.map(elem =>
              elem.code === cartItem.code ? { ...elem, count: elem.count + 1 } : elem
            )
          : this.state.cart.cartItems.concat({ ...cartItem, count: 1 }),
          totalPrice: this.state.cart.totalPrice + cartItem.price,
      },
    });
  }

  /**
   * Удаление записи из корзины
   * @param cartItem {Object}
   */
  deleteItemsFromCart(cartItem) {

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartItems: this.state.cart.cartItems.filter(elem=> elem.code !== cartItem.code),
        totalPrice: this.state.cart.totalPrice - cartItem.price * cartItem.count,
      },
    });
  }
}

export default Store;