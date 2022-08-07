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
   * @param code
   */
  addCart(code) {
    const cartItem = this.state.cart.find(item=>item.code === code)
    if (cartItem) {
      this.setState({
        ...this.state, 
        cart: this.state.cart.map(item => item.code === code ? { ...item, count: item.count + 1 } : item)
      })
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...this.state.items.find(item=>item.code === code), count: 1 } ]
      })
    }
    this.calculateCartSum()
  }

  /**
   * Удаляем товар из корзины
   * @param code
   */
  deleteCart(code) {
    this.setState({
      ...this.state, 
      cart: this.state.cart.filter(item => item.code !== code)
    })
    this.calculateCartSum()
  }

  /**
   * Сумма корзины
   */
  calculateCartSum() {
    this.setState({
      ...this.state,
      cartSum: this.state.cart.reduce((a,b)=>a + b.price * b.count, 0)
    })
  }

  /**
   * Тоггл модального окна
   */
  toggleModal() {
    this.setState({
      ...this.state,
      isModal: !this.state.isModal
    })
  }
}

export default Store;
