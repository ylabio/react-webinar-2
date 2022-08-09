import { cartQtyUpdate } from "./utils";

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
   * Удаление товара из корзины
   * @param item {{code: number, title: string, price: number, qty: number}} объект товара из корзины
   */
  removeItemFromCart(item) {
    this.setState({
      ...this.state,
      cart:
        // Удаляем запись о товаре из корзины целиком
        this.state.cart.filter((cartItem) => cartItem.code !== item.code),
    });
  }

  /**
   * Добавление товара в корзину
   * @param item {{code: number, title: string, price: number}} объект товара из каталога
   */
  addItemToCart(item) {
    this.setState({
      ...this.state,
      cart:
        // Проверяем наличие товара в корзине
        this.state.cart.find((cartItem) => cartItem.code === item.code)
          ? // Если товар есть в корзине - увеличиваем количество товара на 1 шт.
            cartQtyUpdate(item, this.state.cart, true)
          : // Если товара нет в корзине - добавляем новый товар в корзину
            [...this.state.cart, { ...item, qty: 1 }],
    });
  }
}

export default Store;
