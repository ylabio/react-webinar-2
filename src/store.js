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
   * @param item {Object}
   */
  addItemToCart(item) {
    const checkItemInCart = this.state.cart.items.find(element => element.code === item.code);

    this.setState({
      ...this.state,
      cart: {
        ... this.state.cart,
        items: checkItemInCart ?
          this.state.cart.items.map(element => element.code === item.code ?
            {...element, amount: element.amount + 1} : element) :
          this.state.cart.items.concat({...item, amount: 1}),
        total: this.state.cart.total + item.price
      }
    });
  }

  /**
   * Удаление товара из корзины
   * @param item {Object}
   */
  deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter(element => element.code !== item.code),
        total: this.state.cart.total - (item.price * item.amount)
      }
    });
  }

  /**
   * Открытие модального окна с корзиной
   */
  openCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpened: true
      }
    });
  }

  /**
   * Закрытие модального окна с корзиной
   */
  closeCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpened: false
      }
    });
  }
}

export default Store;
