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
   * Изменяет стоимость корзины
   * @param newPrice
   */
  setCartPrice(newPrice) {
    this.setState({
      ...this.state,
      cartPrice: newPrice
    });
  }
  /**
   * Изменяет количество товара в корзине
   * @param newCount
   */
  setItemsInCart(newCount) {
    this.setState({
      ...this.state,
      itemsInCart: newCount
    });
  }
  /**
   * Добавляет товар в корзину пользователя
   * @param code
   */
  addItemToCart(code) {
    const newShoppingCart = [...this.state.shoppingCart]
    const possibleIndex = newShoppingCart.findIndex((item) => item.code === code)
    let itemPrice
    if(possibleIndex !== -1) {
      const newItem = {...newShoppingCart[possibleIndex]}
      newItem.amount++
      newShoppingCart[possibleIndex] = newItem
      itemPrice = newItem.price
    } else {
      const newItem = {...this.state.items.find((item) => item.code === code), amount: 1}
      itemPrice = newItem.price
      newShoppingCart.push(newItem)
      this.setItemsInCart(this.state.itemsInCart + 1)
    }
    this.setCartPrice(this.state.cartPrice + itemPrice)
    this.setState({
      ...this.state,
      shoppingCart: newShoppingCart,
    });
  }
  /**
   * Удаляет товар из корзины пользователя
   * @param code
   */
  removeItemFromCart(code) {
    let newShoppingCart = [...this.state.shoppingCart]
    const itemIndex = newShoppingCart.findIndex((item) => item.code === code)
    let deletedPrice = 0
    if(itemIndex !== -1) {
      deletedPrice = newShoppingCart[itemIndex].amount * newShoppingCart[itemIndex].price
      this.setCartPrice(this.state.cartPrice - deletedPrice)
      newShoppingCart.splice(itemIndex,1)
      this.setItemsInCart(this.state.itemsInCart - 1)
    }
    if(newShoppingCart.length === 0) this.switchCart()
    this.setState({
      ...this.state,
      shoppingCart: newShoppingCart,
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
