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
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  /**
   * Получение стоимости всех покупок в корзине
   * @return {number}
   */
  getTotalAmount() {
    return this.getState().cart.reduce((sum, current) => {
      return (sum + current.price * current.quantity) || 0;
    }, 0)
  }

  /**
   * Добавление товара в корзину
   * Если товар с таким кодом уже добавлен, изменяется его количество
   * @param item
   */
  addItemToCart(item) {
    const isExist = this.state.cart.some((product) => product.code === item.code); // Поиск товара по коду; true - если такой товар есть, false - если нет

    // Если товара нет в корзине он добавляется со значением quantity: 1, в противном случае - меняется количество товара

    !isExist
      ? this.setState({
          ...this.state,
          cart: this.state.cart.concat({ ...item, quantity: 1 }),
        })
      : this.setState({
          ...this.state,
          cart: this.state.cart.map((product) =>
            product.code === item.code
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        });
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((product) => product.code !== item.code),
    });
  }
}

export default Store;
