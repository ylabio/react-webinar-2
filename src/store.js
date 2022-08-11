import { get_cart_total_values } from "./utils";

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

  addItemToCart({ code, title, price }) {
    const target = this.state.cart.find((item) => {
      return item.code === code;
    });

    if (!target)
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({ code, title, price, quantity: 1 }),
        total_cart_price: this.state.total_cart_price + price,
        total_cart_quantity: this.state.total_cart_quantity + 1,
      });
    else
      this.setState({
        ...this.state,
        total_cart_price: this.state.total_cart_price + price,
        cart: this.state.cart.map((item) => {
          return item.code === code
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      });
  }

  deleteItemFromCart({ code }) {
    const target = this.state.cart.find((item) => item.code === code);

    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
      total_cart_price:
        this.state.total_cart_price - target.price * target.quantity,
      total_cart_quantity: this.state.total_cart_quantity - 1,
    });
  }

  toggleCartVisibility() {
    this.setState({
      ...this.state,
      cartVisibility: !this.state.cartVisibility,
    });
  }
}

export default Store;
