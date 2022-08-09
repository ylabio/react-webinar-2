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
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.code !== code),
    });
  }

    /**
   * Добавление в корзину
   */
  addToCart(item) {
    let updatedCart = [];
    const isInCart = this.state.cart.cartItems.some(cartItem => cartItem.code === item.code);

    !isInCart 
    ? updatedCart = [...this.state.cart.cartItems,{...item, qty: 1}]
    : updatedCart = this.state.cart.cartItems.map(uCartItem => {
      if(uCartItem.code === item.code) {
        return {
          ...uCartItem,
          qty: uCartItem.qty + 1,
        }
      }
      return uCartItem
    });

    this.setState({
      ...this.state,
      cart: {...this.state.cart,
        cartItems: updatedCart,
        totalCost: this.state.cart.totalCost + item.price,
      } 
    });
  }

    /**
   * Удаление из корзины
   */
  removeFromCart(item) {
    this.setState({
      ...this.state,
      cart: {...this.state.cart,
        cartItems: this.state.cart.cartItems.filter(cartItem => cartItem.code !== item.code),
        totalCost: this.state.cart.totalCost - (item.price * item.qty)
      } 
    });
  }
}


export default Store;
