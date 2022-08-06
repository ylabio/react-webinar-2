class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = {
      ...initState,
      orders: [] // массив для товаров в корзине
    }
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
   * Добавление в корзину
   */
  createItem(item) {
    const existItem = this.state.orders.find((el) => el.code === item.code);
    if(existItem) {
      this.setState({
        ...this.state,
        orders: this.state.orders.map(el => {
          return el.code === item.code ? {...existItem, amount: existItem.amount + 1} : el
        })
      })
    }else {
      this.setState({
        ...this.state,
        orders: [...this.state.orders, {...item, amount: 1}]
      });
    }
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      orders: this.state.orders.filter(item => item.code !== code)
    });
  }
}

export default Store;
