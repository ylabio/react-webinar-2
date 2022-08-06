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
  addItemToCart(item) {
    let isItemInCart = false;
    this.state.cartItems.forEach((el) => {
      if (el.code === item.code) {
        isItemInCart = true;
      }
    });
    if (!isItemInCart) {
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems, item],
      });
    }
    if (isItemInCart) {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map((el) => {
          if (el.code === item.code) {
            el.quantity++;
          }
          return el;
        }),
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItemToCart(item) {
        this.setState({
          ...this.state,
          cartItems: this.state.cartItems.filter((el) => el.code !== item.code),
        });
  }

  /**
   * Скрыть/показать модальное окно
   * @param showCart
   */
  showCart(showCart) {
    this.setState({
      ...this.state,
      showCart: !showCart,
    });
  }
}

export default Store;
