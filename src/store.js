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
   * @param code
   */
  addToCart(code) {
    const index = this.state.cart.findIndex(item => item.code === code)

    //Если есть в корзине
    if (index > -1) {
      const cartItem = this.state.cart.find(item => item.code === code);
      const plusCartItem = {
        ...cartItem,
        number: 1 + cartItem.number
      };

      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart.slice(0, index),
          plusCartItem,
          ...this.state.cart.slice(index + 1)
        ]
      })
    } else {
      const item = this.state.items.find(item => item.code === code);
      const newItem = {
        ...item,
        number: 1,
      }
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          newItem
        ]
      })
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    const index = this.state.cart.findIndex(item => item.code === code);

    this.setState({
      ...this.state,
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1),
      ]
    })
  }

  /**
 * Подсчет стоимости всех товаров
 * @param code
 */
  calcCost() {
    const items = this.state.cart;
    let sum = 0;
    items.forEach(item => {
      sum += item.number * item.price
    });
    return sum.toLocaleString('ru');
  };
}


export default Store;
