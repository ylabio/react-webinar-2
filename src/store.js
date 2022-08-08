class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = {
      ...initState,
      socket: []  //товары в корзине
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

  createItem(item) {
    const arrayOfItems = this.state.socket.find((el) => el.code === item.code);
    if(arrayOfItems) {
      this.setState({
        ...this.state,
        socket: this.state.socket.map((el) => {
          return el.code === item.code ? {...arrayOfItems, amount: arrayOfItems.amount + 1} : el
        })
      })
    }else {
      this.setState({
        ...this.state,
        socket: [...this.state.socket, {...item, amount: 1}]
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
      socket: this.state.socket.filter(item => item.code !== code)
    });
  }

  
}

export default Store;
