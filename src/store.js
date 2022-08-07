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
   * Удаление из корзины по её коду
   * @param code
   */
  deleteItem(code) {
    const item = this.getState().cart.items.find(item => item.code === code);
    const amount = this.getState().cart.amount - 1;
    const price = this.getState().cart.price - item.price * item.amount;
    
    this.setState({
      ...this.state,
      cart: {
        items: this.state.cart.items.filter(item => item.code !== code),
        amount,
        price
      }
    });
  }

  /**
   * Добавление в корзину по её коду
   * @param code
   */
  addItem(code) {
    const item = this.getState().items.find(item => item.code === code);
    const items = this.getState().cart.items.map(item => {
      if (item.code === code){
        return {...item, amount: item.amount + 1};
      } return item;
    });
    if (this.getState().cart.items.findIndex(item => item.code === code) < 0) {
      items.push({...item, amount: 1})
    }
    items.sort((prev, next) => prev.code - next.code);
    let amount = items.length;
    let price = 0;
    for (const item of items) {
      price += item.price * item.amount;
    }

    this.setState({
      ...this.state,
      cart: {
        items,
        amount,
        price
      }
    })
  }
}

export default Store;
