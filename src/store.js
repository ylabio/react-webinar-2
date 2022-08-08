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
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
    });
  }

  deleteItem(code) {
    debugger;
    delete this.state.basket[code]
    this.setState({
      ...this.state,
    })
  }
  

  /**
   * добавление  записи по её коду в корзину
   * @param code
   */
  putItemToBasket(code) {
    if(this.state.basket[code] != undefined) {
      this.state.basket[code] = this.state.basket[code] + 1 
    } else {
      this.state.basket[code] = 1
    }
    this.setState({
      ...this.state,
    });
  }


  /**
   * Выделение записи по её коду
   * @param code
   */
}

export default Store;
