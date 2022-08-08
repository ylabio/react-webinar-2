class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = {
      ...initState,
      basket: [],
    };
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
  // createItem({code, title = 'Новый товар', price = 999, selected = false}) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.concat({code, title, price, selected})
  //   });
  // }

  /**
   * Добавление в корзину
   */
  addItemInBasket(itemAdd) {
    let isItemInBasket = false;

    this.state.basket.forEach((good) => {
      if (good.code === itemAdd.code) {
        isItemInBasket = true;
      }
    });

    if (isItemInBasket) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((good) => {
          if (good.code === itemAdd.code) {
            return {
              ...good,
              count: good.count + 1
            }
          }
          return {...good};
        }),
      });
    } else {
      this.setState({
        ...this.state,
        basket: [...this.state.basket, { ...itemAdd, count: 1 }],
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
      basket: this.state.basket.filter((item) => item.code !== code),
    });
  }
}

export default Store;
