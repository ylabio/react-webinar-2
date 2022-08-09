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
  addToCart(code) {
    if (this.state.cart.find(item => item.code === code)) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => item.code === code ? {...item, amount: item.amount + 1} : item)
      })
    } else {
      const newItem = this.state.items.find(item => item.code === code)

      this.setState({...this.state, cart: [...this.state.cart, {...newItem, amount: 1}]})
    }
    this.getTotals()
  }

  /**
   * Удаление товара
   * @param code
   */
  removeItem(code) {
    this.setState({
      ...this.state, 
      cart: this.state.cart.filter(item => item.code !== code)
      })
    this.getTotals()
  }

  /**
   * Получение общей цены и кол-ва товара
   * @param code
   */
  getTotals() {
    let { total, amount } = this.state.cart.reduce((cartTotal, cartItem) => {
      const { price, amount } = cartItem

      cartTotal.total += price * amount
      cartTotal.amount += amount

      return cartTotal
    }, { total: 0, amount: 0 })

    this.setState({ ...this.state, total, amount })
  }

  /**
   * Открыть/закрыть модалку
   * @param code
   */
  openModal() {
    this.setState({ ...this.state, isModalOpen: true})
  }

  closeModal() {
    this.setState({ ...this.state, isModalOpen: false})
  }
}

export default Store;
