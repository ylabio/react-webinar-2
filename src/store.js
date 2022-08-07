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
   * Добавляет в корзину
   */
  addToCart(code) {
    const cartItems = this.state.cart.slice();
    const cartItem = cartItems.find((o) => o.code === code);
    if (cartItem) {
      cartItem.count += 1;
      this.setState({
        ...this.state,
        cart: [...cartItems],
      })
    } else {
      const item = this.state.items.find((o) => o.code === code);
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({...item, count: 1})
      })
    }
  }

  /**
   * Удаление из корзины
   * @param {*} code
   */
  removeToCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code)
    });
  }

  /**
   * Итоговая стоимость товаров в корзине
   * @returns {Number} - стоимость товаров 
   */
  getTotalPriceCart() {
    if (!this.state.cart.length) return 0;
    const totalPrice = this.state.cart.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.count;
    }, 0);
    return totalPrice;
  }

  /**
   * Количество товара в корзине
   * @returns {Number} - Number
   */
  getTotalNumberInCart() {
    return this.state.cart.length;
  }
}

export default Store;
