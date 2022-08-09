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

  addItemToCart({item}) {
    let checkItem = true;
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.map(itemObj => {
        if (itemObj.code === item.code) {
          checkItem = false;
          return {
            ...itemObj,
            count: itemObj.count + 1
          }
        }
        return itemObj;
      })
    });

    if (checkItem) {
      return this.setState({
        ...this.state,
        cartItems: this.state.cartItems.concat({...item, count: 1})
      });

    }
  }
  deleteCartItem(item) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter((itemObj)=>itemObj.code !== item.code)
    })
  }

}

export default Store;