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


  // Добавление в корзину

  addToCart(code) {
    this.setState({
      ...this.state, itemsInCart :
        this.state.items.filter(i => {
          if(i.code === code) {
            return {...i, count: ++i.count}
          }
          return i.count ? i : null
        })
    })
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state, itemsInCart :
          this.state.items.filter(i => {
            if(i.code === code) {
              return {...i, count: --i.count}
            }
            return i.count > 0 ? i : null
          })
    })
  }


}

export default Store;
