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
   * Создание записи
   */
  createCartItem({code, title, price, count = 1}) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.some(item => item.code === code)
        ? this.state.cartItems.map(item => {
          if (item.code === code){
            return {
              ...item,
              count: item.count + 1
            }
          }
          return item;
        })
        : this.state.cartItems.concat({code, title, price, count}),
      totalPrice: this.state.totalPrice + price
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code),
      totalPrice: this.state.cartItems.reduce((sum,item) => {
        return sum + (item.code === code ? 0 : item.price * item.count)
      },0)
    });
  }

  
}

export default Store;
