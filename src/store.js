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
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      shoppingCart: this.state.shoppingCart.filter(item => item.code !== code)
    });
  }

  /**
   * Добавление записи в корзину
   */
  addItem(code) {
    const item = this.state.items.find(item => item.code === code);
    const shoppingCartItem = this.state.shoppingCart.find(item => item.code === code);

    if (shoppingCartItem) {
      this.setState({
        ...this.state,
        shoppingCart: this.state.shoppingCart.map((value) => value.code === code ?
          {...value, quantity: value.quantity + 1}
          : value)
      })
    } else {
      this.setState({
        ...this.state,
        shoppingCart: this.state.shoppingCart.concat({...item, quantity: 1})
      })
    }
  }

  numOfGoods() {
    return [...new Set(this.state.shoppingCart)].length;
  }

  sumOfGoods() {
    return this.state.shoppingCart.map(item => item.price * item.quantity).reduce((acc, value) => acc + value, 0);
  }
}

export default Store;
