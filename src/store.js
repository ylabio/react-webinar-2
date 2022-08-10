import { cartSummary } from './utils';

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
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    const cart = this.state.cart;
    const inCart = cart.inCart.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      cart: {
        inCart,
        amount: cartSummary(inCart),
        count: --cart.count,
      },
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    const cart = this.state.cart;
    let count = this.state.cart.count;
    if (!cart.inCart.find((item) => item.code === code)) {
      cart.inCart.push({ ...this.state.items.find((item) => item.code === code), quantity: 0 });
      ++count;
    }
    const inCart = cart.inCart.map((item) => {
      if (item.code === code) {
        ++item.quantity;
      }
      return item;
    });
    this.setState({
      ...this.state,
      cart: {
        inCart,
        amount: cartSummary(inCart),
        count,
      },
    });
  }
}

export default Store;
