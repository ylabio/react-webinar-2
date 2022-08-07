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
   * Создание записи
   */
  createItem({code, title = 'Новый товар', price = 999}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price})
    });
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

  /**
   * Создание записи корзины
   */
   createCartItem({code, title = 'Новый товар', price = 999, number}) {
    
    if(this.state.cart.find(item => item.code === code))
    {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => {
          if(item.code === code){
            return {
              ...item,
              count: item.count + 1 || 1
            }
          }
          return item;
        })
      });
      return
    }
    this.setState({
      ...this.state,
      cart: this.state.cart.concat({code, number, title, price, count: 1})
    });
  }
  /**
   * Удаление записи корзины по её коду
   * @param code
   */
   deleteCartItem(code) {
    let number = 1;
    this.setState({
      ...this.state,
      cart: this.state.cart
        .filter(item => item.code !== code)
        .map((item) => {return {...item, number: number++}})
    });
  }
}

export default Store;
