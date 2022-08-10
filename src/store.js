class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
    this.addToCart = this.addToCart.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.setTotalCount = this.setTotalCount.bind(this);
    this.setTotalSum = this.setTotalSum.bind(this);
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

  addToCart(code) {
    const {items, cart} = this.getState();
    items.forEach(item => {
      if(item.code === code){
        const index = cart.findIndex(c => c.code === item.code)
        if(index === -1){
          const newState = {
            ...this.state,
            cart: [...cart, {...item, count: 1}]
          }
          this.setState(newState);
        } else {
          const updateCart = [...cart];
          updateCart[index].count += 1;
          const newState = {
            ...this.state,
            cart: [...updateCart]
          }
          this.setState(newState)
        }
      }
    })
    this.setTotalCount();
    this.setTotalSum();
  }

  removeCartItem(code){
    const cart = this.getState().cart;
    let updateCart = [...cart];
    updateCart = updateCart.filter(c => c.code !== code);
    const newState = {
      ...this.state,
      cart: [...updateCart]
    }
    this.setState(newState);
    this.setTotalCount();
    this.setTotalSum();
  }

  setTotalCount(){
    const cart = this.getState().cart;
    const newState = {
      ...this.state,
      totalCount: cart.length
    }
    this.setState(newState);
  }

  setTotalSum(){
    const cart = this.getState().cart;
    const total = cart.reduce((acc, c) => (c.price * c.count) + acc, 0);
    const newState = {
      ...this.state,
      totalSum: total
    }
    this.setState(newState);
  }
}


export default Store;
