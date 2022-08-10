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
   * Удаление записи из корзины по её коду
   * @param code
   */
  deleteItemCart(code, price, quantity) {
    this.setState({
      ...this.state,
      itemsCart: this.state.itemsCart.filter(item => item.code !== code),
      quantityUnicItemsCart: this.state.quantityUnicItemsCart -= 1,
      sumPricesInCart: this.state.sumPricesInCart - price * quantity
    });
  }

  /**
   * Добавление товара в корзину
   */
  addProductToCart({item}) {
    if (this.state.itemsCart.find(itemsCart => itemsCart.code === item.code)) {
      this.setState({
        ...this.state,
        itemsCart: this.state.itemsCart.map(itemCart => {
          if (itemCart.code === item.code){
            return {
              ...itemCart,
              quantity: itemCart.quantity += 1,
            }
          }
          return itemCart;
        }),
        sumPricesInCart: this.state.sumPricesInCart + item.price
      });
    } else {
      this.setState({
        ...this.state,
        itemsCart: this.state.itemsCart.concat({...item, quantity: 1}),
        quantityUnicItemsCart: this.state.quantityUnicItemsCart += 1,
        sumPricesInCart: this.state.sumPricesInCart + item.price
      });
    }
  }
}

export default Store;
