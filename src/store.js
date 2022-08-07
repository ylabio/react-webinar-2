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

  addToCart(item) {
    if (this.state.cart.items.some((cartItem) => cartItem.code === item.code)) {
      this.setState({
        ...this.state,
        cart: {
          items: this.state.cart.items.map((cartItem) =>
            cartItem.code === item.code
              ? {...cartItem, cartCount: cartItem.cartCount + 1}
              : cartItem,
          ),
          totalPrice: this.state.cart.items.reduce((totalPrice, {
            price,
            cartCount
          }) => totalPrice += Number(price) * cartCount, item.price)
        }
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          items: this.state.cart.items.concat({...item, cartCount: 1}),
          totalPrice: this.state.cart.items.reduce((totalPrice, {
            price,
            cartCount
          }) => totalPrice += Number(price) * cartCount, item.price)
        }
      });
    }
  }

  deleteFromCart(item) {
    this.setState({
      ...this.state,
      cart: {
        items: this.state.cart.items.filter((cartItem) => cartItem.code !== item.code),
        totalPrice: this.state.cart.items.reduce((totalPrice, {
          price,
          cartCount
        }) => totalPrice += Number(price) * cartCount, item.price)
      },
    });
  }
}

export default Store;
