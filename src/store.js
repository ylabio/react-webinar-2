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
  addToCart(item) {
    // товар мог быть уже добавлен в корзину, ищем его индекс
    const index = this.state.cart.items.findIndex((cartItem) => cartItem.code === item.code)

    if (index === -1) {
      // если товар не был найден в корзине, то добавляем его в массив, устанавливаем счетчик
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart, 
          items: [...this.state.cart.items, {...item, amount: 1}],
          itemsQuantity: this.state.cart.itemsQuantity + 1, 
          totalPrice: this.state.cart.totalPrice + item.price
        }
      });
    } else {
      // если товар уже содержится в корзине, находим его и увеличиваем счетчик
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart, 
          items: this.state.cart.items.map((cartItem) => {
            if (cartItem.code === item.code) {
              return {...cartItem, amount: cartItem.amount + 1}
            }
            return cartItem
          }), 
          totalPrice: this.state.cart.totalPrice + item.price
        }
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteFromCart(item) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart, 
        items: this.state.cart.items.filter(cartItem => cartItem.code !== item.code),
        itemsQuantity: this.state.cart.itemsQuantity - 1,
        totalPrice: this.state.cart.totalPrice - item.price * item.amount
      }
    });
  }

}

export default Store;
