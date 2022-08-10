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
   */
  addItem(code, title, price) {
   let itemFind = false       // перееменная результата поиска item
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => {
          if (item.code === code) {
            itemFind = true
            return {code, title, price, count: ++item.count}
          } else {
            return item
          }
        })
      })
    if (!itemFind) {  // если item был найден itemFind блокирует добавление одинакового товара
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({code, title, price, count: 1})
      })
    }
  }

  /**`
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
  }

}

export default Store;
