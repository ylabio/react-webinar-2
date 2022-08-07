class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
    // Корзина
    this.state.cart = {total: 0, unique: 0, items: []};
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
   * Добавление записи в корзину
   */
  addItem(code) {
    const concatArray = this.state.cart.items.concat(code);
    this.setState({
      ...this.state,
      cart: {total: this.state.cart.total + this.getItem(code).price, unique: new Set(concatArray).size, items: concatArray}
    });
  }

  /**
   * Добавление записи в корзину
   */
  getItem(code) {
    return this.state.items.find(item => item.code === code);
  }

  /**
   * Удаление записей по её коду из корзины
   * @param code
   */
  deleteItems(code) {
    const filteredArray = this.state.cart.items.filter(item => item !== code);
    this.setState({
      ...this.state,
      cart: {total: this.state.cart.total - this.getItem(code).price, unique: new Set(filteredArray).size, items: filteredArray}
    });
  }
}

export default Store;
