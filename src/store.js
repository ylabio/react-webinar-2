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
  createItem({code, title = 'Новый товар', price = 999}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price})
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
  }

  /**
   * Добавление товара
   * @param code
   */
  addProduct(code) {
    const getOneItem = () => {
      const result = this.state.items.filter((item) => item.code === code);
      result[0].count = 1;
      return result;
    }

    if (this.state.basket.some((item) => item.code === code)) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1
            }
          }
          return item;
        })
      });
    } else if (this.state.basket.length) {
      this.setState({
        ...this.state,
        basket: this.state.basket.concat(getOneItem()), 
      });
    } else {
      this.setState({
        ...this.state,
        basket: getOneItem(), 
      });
    }
  }
}

export default Store;
