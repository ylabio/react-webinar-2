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

  _calculateTotalPrice() {
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce((sum, item) => {
        return sum + (item.cartCount * item.price);
      }, 0)
    })
  }

  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      itemsInCart: this.state.itemsInCart - 1
    });
    this._calculateTotalPrice()
  }

  addToCart(code) {
    const cart = this.state.cart;
    const addedItem = this.state.items.find(item => item.code === code);
    const isAddedItemInCart = cart.some((item) => item.code === code);

    if (isAddedItemInCart) {
      this.setState({
        ...this.state,
        cart: cart.map((item) => {
          if (item.code === code) {
            return { ...item, cartCount: ++item.cartCount }
          }
          return item;
        })
      });
      this._calculateTotalPrice()
    } else {
      this.setState({
        ...this.state,
        cart: cart.concat({ ...addedItem, cartCount: 1 }),
        itemsInCart: this.state.itemsInCart + 1
      });
      this._calculateTotalPrice()
    }
  }

}

export default Store;
