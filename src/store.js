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
    const hasInCart = this.state.cart.find(item => item.code === code);
    if (!hasInCart) {
      const item = this.state.items.find(item => item.code === code);
      const newItem = {...item, selectedTimes: 1 };
      return this.setState({
          ...this.state,
          cart: [...this.state.cart, newItem]
        })
    } 
    this.setState({
      ...this.state,
      cart: this.state.cart.map(item => {
        if (item.code === code){
          return {
            ...item,
            selectedTimes: item.selectedTimes + 1
          }
        }
        return item;
      })
    })
   }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }
}

export default Store;
