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
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  /**
   * Создание записи
   */
  createItem({ code, title = 'Новый товар', price = 999 }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price }),
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  addItemToBin(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            addCounter: item.addCounter + 1,
          };
        }
        return item;
      }),
    });
  }

  DeleteItemFromBin(code) {
    this.setState({
        ...this.state,
        items: this.state.items.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              addCounter: 0,
            };
          }
          return item;
        }),
      });

  }
}

export default Store;
