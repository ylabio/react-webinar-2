import cart from "./components/cart";

class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    this.cartItems = [];
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

  getCartItems() {
    return this.cartItems;
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

  addItemInCart(code) {
    let currentItem = this.state.items.find((item) => item.code === code);
    console.log(currentItem);
    this.setState({
      ...this.state,
      cartItems: {
        ...this.cartItems,
        cartItems: this.cartItems.push(currentItem),
      },
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.filter(item => item.code !== code)
  //   });
  // }
}

export default Store;
