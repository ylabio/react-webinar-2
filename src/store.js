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

  addToCart(code) {
    const s = this.state;
    const cartIndex = s.cart.items.findIndex(item => item.code === code);

    const result = (cartIndex === -1)
      ? s.cart.items.concat({
          ...s.catalogItems.find(item => item.code === code),
          count: 1
        })
      : s.cart.items.map((item, index) => {  
          return (index === cartIndex)
            ? { ...item, count: item.count + 1 }
            : item;
        });

    this.setState({
      ...s,
      cart: {
        items: result,
        totalPrice: result.reduce((sum, item) => sum + item.price * item.count, 0),
        distinctItems: result.length
      }
    })
  }

  removeFromCart(code) {
    const result = this.state.cart.items.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      cart: {
        items: result,
        totalPrice: result.reduce((sum, item) => sum + item.price * item.count, 0),
        distinctItems: result.length
      }
    })
  }
}

export default Store;
