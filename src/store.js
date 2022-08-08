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
  createItem({ code, title = "Новый товар", price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
    });
  }

  /**
   * Добавление товара в корзину
   */
  addItem(item) {
    let isItemFind = false;
    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        items: this.getState().basket.items.map((elem) => {
          if (elem.code === item.code) {
            isItemFind = true;
            return { ...elem, amount: elem.amount + 1 };
          }
          return elem;
        }),
      },
    });

    if (!isItemFind) {
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          items: this.getState().basket.items.concat({
            ...item,
            amount: 1,
          }),
        },
      });
    }

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        amount: this.getState().basket.items.length,
        sum: this.state.basket.sum + item.price,
      },
    });
  }

  /**
   * Удаление записи з корзины по её коду
   * @param code
   */

  deleteBasketItem(item) {
    this.setState({
      ...this.state,
      basket: {
        items: this.state.basket.items.filter(
          (elem) => elem.code !== item.code
        ),
        amount: this.getState().basket.amount - 1,
        sum: this.state.basket.sum - item.price * item.amount,
      },
    });
  }
}

export default Store;
