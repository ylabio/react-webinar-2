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
   * @param product
   */
  deleteToCart(product) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== product.code)
    });
  }

  /**
   * Добавление товара в корзину по его коду
   * @param product
   */
  addToCart(product) {
    const index = this.state.cart.findIndex(item => item.code === product.code);
    const newCart = [...this.state.cart];

    if (index === -1) {
      newCart.unshift({...product, count: 1});
    } else {
      newCart[index] = {
        ...newCart[index],
        count: newCart[index].count + 1
      };
    }
    this.setState({...this.state, cart: newCart});
  }
}

export default Store;
