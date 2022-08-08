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


  onAddProduct(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.concat(this.state.items.filter(item => item.code === code))
    });

  }

  onDeleteProduct(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code != code)
    })
  }

  setModaStatus() {
    this.setState({
      ...this.state,
      modalStatus: true
    })
  }
}

export default Store;
