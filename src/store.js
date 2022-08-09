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
   * Добавляет товар в корзину
   * @param {*} code - код товара
   */
  addToCart(code) {
    const cartItems = this.state.cart.items.slice(); // Делаем копию items
    const cartItem = cartItems.find(item => item.code === code);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      const item = this.state.items.find(item => item.code === code);
      cartItems.push({...item, count: 1});
    }

    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: [...cartItems],
        totalPrice,
        totalNumber: cartItems.length, 
      }
    })
  }

  /**
   * Удаление из корзины
   * @param {*} code - код товара
   */
  removeToCart(code) {
    const cartItems = this.state.cart.items.filter(item => item.code !== code);
    
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: [...cartItems],
        totalPrice,
        totalNumber: cartItems.length,
      } 
    });
  }
}

export default Store;
 