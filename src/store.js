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
    const isInCart = this.state.cart.some(cartItem => cartItem.code === item.code);

    !isInCart 
    ? updatedCart = [...this.state.cart,{...item, qty: 1}] 
    : updatedCart = this.state.cart.map(uCartItem => {
      if(uCartItem.code === item.code) {
        uCartItem.qty++;
      }
      return uCartItem;
    });

    this.setState({
      ...this.state,
      cart: updatedCart
    });
  }

    /**
   * Удаление из корзины
   */
  removeFromCart(item) {
    let updatedCart = [];
    const currentItem = this.state.cart.find(cartItem=> cartItem.code === item.code);
    if (currentItem.qty === 1) {
      updatedCart = this.state.cart.filter(cartItem => cartItem.code !== currentItem.code);
      } else {
        updatedCart = this.state.cart.map(cartItem => {
          if(cartItem.code === item.code) {
            cartItem.qty--;
          }
          return cartItem;
        });
      }
    
      this.setState({
      ...this.state,
      cart: updatedCart,
      });
    }
}


export default Store;
