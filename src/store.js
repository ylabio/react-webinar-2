import {sumProducts} from "src/utils";

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
   * Удаление записи по её коду
   * @param code
   */
  deleteToCart(code) {
    const newCart = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: newCart,
      totalSum: sumProducts(newCart),
      quantityProduct: newCart.length
    });
  }

  /**
   * Добавление товара в корзину по его коду
   * @param code
   */
  addToCart(code) {
    const index = this.state.cart.findIndex(item => item.code === code);
    const item = this.state.items.find(item => item.code === code);
    const newCart = [...this.state.cart];

    if (index === -1) {
      newCart.unshift({...item, count: 1});
    } else {
      newCart[index] = {
        ...newCart[index],
        count: newCart[index].count + 1
      };
    }

    this.setState({
      ...this.state,
      cart: newCart,
      totalSum: sumProducts(newCart),
      quantityProduct: newCart.length
    });
  }

}

export default Store;
