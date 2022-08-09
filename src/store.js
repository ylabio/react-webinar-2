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
   * @param code {number}
   * @param item {Object}
   */
  addItemToCart(code, item) {

    const cartItems = this.state.cartItems;

    if (cartItems.find((item) => item.code === code) === undefined) {
      this.setState({
        ...this.state,
        cartItems: [...cartItems, {...item, amount: 1}],
      });
    } else {
      this.setState({
        ...this.state,
        cartItems: cartItems.map((item) => {
          if (item.code === code) {
            return {...item, amount: item.amount + 1};
          } else {
            return item;
          }
        }),
      });
    }
    this.calculateCartTotalPrice();
    this.calculateUniqCartItems();
  }

  /**
   * Добавление товара в корзину
   * @param code {number}
   */
  deleteCartItems(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter((item) => item.code !== code),
    });
    this.calculateCartTotalPrice();
    this.calculateUniqCartItems();
  }

  /**
   * Показать/скрыть модальное окно
   */
  toggleModalShow() {
    this.setState({
      ...this.state,
      isModalActive: !this.state.isModalActive
    });
  }

  /**
   * Вычисляет стоимость всех товаров в корзине
   */
  calculateCartTotalPrice() {
    this.setState({
      ...this.state,
      cartTotalPrice: this.state.cartItems.reduce((sum, val) => sum + val.price * val.amount, 0)
    });
  }

  /**
   * Вычисляет стоимость количество уникальных товаров в корзине
   */
  calculateUniqCartItems() {
    this.setState({
      ...this.state,
      cartUniqItemAmount: this.state.cartItems.length
    });
  }
}

export default Store;
