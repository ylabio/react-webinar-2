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
   * @param code
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cart:
        // Проверяем количество товара в корзине
        this.state.cart.find((item) => item.code === code).qty > 1
          ? // Если количество товара в корзине больше 1 - уменьшаем к-во на 1 шт.
            cartQtyUpdate(code, this.state.cart, false)
          : // Если товар один - удаляем запись о товаре из корзины целиком
            this.state.cart.filter((item) => item.code !== code),
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    this.setState({
      ...this.state,
      cart:
        // Проверяем наличие товара в корзине
        this.state.cart.find((item) => item.code === code)
          ? // Если товар есть в корзине - увеличиваем количество товара на 1 шт.
            cartQtyUpdate(code, this.state.cart, true)
          : // Если товара нет в корзине - добавляем новый товар в корзину
            [...this.state.cart, { code: code, qty: 1 }],
    });
  }
}

export default Store;
