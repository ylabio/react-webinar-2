import { counter } from "./utils";

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
   * Удаление записи из корзины по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter((item) => item.code !== code),
    });
    const summ = this.state.cartItems.reduce(function (sum, elem) {
      return sum + elem.price * elem.count;
    }, 0);
    const countElem = this.state.cartItems.length;
    this.setState({
      ...this.state,
      countCartItems: countElem,
      sumCart: summ,
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(elem) {
    const searchElem = this.state.cartItems.find((el) => el.code === elem.code);

    if (searchElem) {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map((el) => {
          if (el.code === elem.code) {
            return { ...el, count: el.count + 1 };
          }
          return el;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.concat({
          ...elem,
          count: 1,
        }),
      });
    }
    const countElem = this.state.cartItems.length;
    const summ = this.state.cartItems.reduce(function (sum, elem) {
      return sum + elem.price * elem.count;
    }, 0);

    this.setState({
      ...this.state,
      countCartItems: countElem,
      sumCart: summ,
    });
  }
}

export default Store;
