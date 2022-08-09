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
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
    let totalPrice = this.state.cart.reduce((totP, cart) => (totP + (cart.count * cart.price)),0);
    let totalItems = this.state.cart.length;
    this.setState({
      ...this.state,
      total: [{totalPrice , totalItems}]
    });
  }

  /**
   * Добавление товара в корзину по его коду
   * @param code
   */
  addInCart(code) {
    let title = this.state.items[code-1].title;
    let price = this.state.items[code-1].price;
    let count = 1;
    let IncludeFilter = this.state.cart.filter(item => item.code === code)
    if(IncludeFilter.length === 0) {
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({code, title, price, count})
      });
    }
    else {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cart => {
          if (cart.code === code ) {
            return {
              ...cart,
              count: cart.count += 1
            }
          }  
          return cart;  
        })
      });
    }
    let totalPrice = this.state.cart.reduce((totP, cart) => (totP + (cart.count * cart.price)),0);
    let totalItems = this.state.cart.length;
    this.setState({
      ...this.state,
      total: [{totalPrice , totalItems}]
    });
  }
}

export default Store;
