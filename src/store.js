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
   */
  amountIncrease(code) {
    if (this.state.cartItems.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map((item) => {
          if (item.code === code) {
            return {
              code,
              title: item.title,
              price: item.price,
              amount: item.amount + 1,
            }
          }
          return item;
        }),
      });
    } else {
      const chosenItem = this.state.items.find(item => item.code === code);

      this.setState({
        ...this.state,
        cartItems:  this.state.cartItems.concat({
            code,
            title: chosenItem.title,
            price: chosenItem.price,
            amount: 1})
      });
    };
  }

  /**
  * Удаление товара из корзины по его коду
  */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code)
    });
  }

  /**
   * Открытие модалки с корзиной
   */
  openCart() {
    this.setState({
      ...this.state,
      isCartOpen: true,
    });
  }

  /**
   * Закрытие модалки с корзиной
   */
   closeCart() {
    this.setState({
      ...this.state,
      isCartOpen: false,
    });
  }

  /**
   * Подсчет общей стоимости товаров в корзине
   */  
  getTotalPrice() {
    return this.state.cartItems.reduce((accum, good) => accum + good.amount * good.price, 0);
  }

}

export default Store;
