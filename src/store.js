class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = {
      ...initState,
      basket: [],
      total: {
        price: 0,
        amount: 0
      }
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
        total: {
          price: this.state.total.price + itemAdd.price,
          amount: this.state.total.amount
        }
      });
    } else {
      this.setState({
        ...this.state,
        basket: [...this.state.basket, { ...itemAdd, count: 1 }],
        total: {
          price: this.state.total.price + itemAdd.price,
          amount: this.state.total.amount + 1
        }
      });
    }
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((good) => good.code !== item.code),
      total: {
        price: this.state.total.price - item.price * item.count,
        amount: this.state.total.amount - 1
      }
    });
  }
}

export default Store;
