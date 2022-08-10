// @ts-nocheck
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

  addItemsToBasket(obj) {
    const findItemInBasket = this.state.basket.items.find(
      (item) => item.code === obj.code
    );

    const totalPrice = this.state.basket.totalPrice + obj.price;

    if (findItemInBasket) {
      this.setState({
        ...this.state,
        basket: {
          items: this.state.basket.items.map((item) => {
            if (item.code === obj.code) {
              return {
                ...item,
                amount: item.amount + 1,
              };
            }
            return item;
          }),
          totalPrice,
        },
      });
    } else {
      this.setState({
        ...this.state,
        basket: {
          items: this.state.basket.items.concat({ ...obj, amount: 1 }),
          totalPrice,
        },
      });
    }
  }

  deleteItemsFromBasket(obj) {
    const totalPrice = this.state.basket.items.reduce((sum, item) => {
      return sum + (item.code === obj.code ? 0 : item.price * item.amount);
    }, 0);

    this.setState({
      ...this.state,
      basket: {
        items: this.state.basket.items.filter((item) => item.code !== obj.code),
        totalPrice,
      },
    });
  }
}

export default Store;
