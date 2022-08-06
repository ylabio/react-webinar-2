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
   * Добавляет товар в корзину пользователя
   * @param code
   */
  addItemToCart(code) {
    const newShoppingCart = [...this.state.shoppingCart]
    const possibleIndex = newShoppingCart.findIndex((item) => item.code === code)
    possibleIndex !== -1 ?
      newShoppingCart[possibleIndex].amount++ :
      newShoppingCart.push({...this.state.items.find((item) => item.code === code), amount: 1})
    this.setState({
      ...this.state,
      shoppingCart: newShoppingCart
    });
  }
  /**
   * Удаляет товар из корзины пользователя
   * @param code
   */
  removeItemFromCart(code) {
    let newShoppingCart = [...this.state.shoppingCart]
    const itemIndex = newShoppingCart.findIndex((item) => item.code === code)
    if (newShoppingCart[itemIndex].amount > 1){
      const newCartItem = {...newShoppingCart[itemIndex]}
      newCartItem.amount--
      newShoppingCart[itemIndex] = newCartItem
    } else {
      newShoppingCart.splice(itemIndex, 1)
    }
    if(newShoppingCart.length === 0) this.switchCart()
    this.setState({
      ...this.state,
      shoppingCart: newShoppingCart
    });
  }
  /**
   * Открывает/закрывает модальное окно
   */
  switchCart() {
    this.setState({
      ...this.state,
      cartOpened: !this.state.cartOpened
    });
  }
}

export default Store;
