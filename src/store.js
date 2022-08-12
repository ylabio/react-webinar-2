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
   * Добавление товара в корзину
   */

  addItemCart({code, title, price}) {
    let checkItem = true;

    this.setState({
      ...this.state,
      cart: this.state.cart.map(item => {
        if (item.code === code) {
          checkItem = false;
          return {
            ...item,
            count: item.count + 1
          }
        }
        return item;
      }),
      calcInCart: {
        ...this.state.calcInCart,
        sum: this.state.calcInCart.sum + price,
      }
    });

    if (checkItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({code, title, price, count: 1}),
        calcInCart: {
          ...this.state.calcInCart,
          count: this.state.calcInCart.count + 1,
        }
      });
    }
  }

  /**
   * Удаление записи по её коду из корзины
   * @param code
   */
  deleteItemCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      calcInCart: {
        count: this.state.calcInCart.count - 1,
        sum: this.state.cart.reduce((sum, item) => {
          if (item.code !== code) {
            return sum + item.price * item.count;
          }
          return sum;
        } , 0),
      }
    });
  }
}

export default Store;