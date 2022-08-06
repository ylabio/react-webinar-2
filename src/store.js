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
   * Открывает модальное окно
   */
  openModal() {
    this.setState({
      ...this.state,
      isOpen: true,
    });
  }

  /**
   * Закрывает модальное окно
   */
  closeModal() {
    this.setState({
      ...this.state,
      isOpen: false,
    });
  }

  /**
   * Добавление записи в корзину
   */
  addItemToCart(code) {
    const item = this.state.items.find(i => i.code === code);
    const isCartItem = this.state.cartItems.find(cartItem => cartItem.code === item.code);

    let cartItems = [];
    if (isCartItem) {
      cartItems = this.state.cartItems.map(cartItem => {
        return cartItem.code === item.code ? {...cartItem, amount: cartItem.amount + 1} : cartItem;
      });
    } else {
      cartItems = [...this.state.cartItems, {...item, amount: 1}];
    }

    this.setState({
      ...this.state,
      cartItems,
    });
  }

  /**
   * Удаление записи из корзины по её коду
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(cartItem => cartItem.code !== code)
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }

}

export default Store;
