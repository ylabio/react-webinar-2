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
   * Добавление товара в корзину
   * Если товар с таким кодом уже добавлен, изменяется его количество
   * @param code {Number}
   */
  addItemToCart(code) {
    const item = this.state.items.find((product) => product.code === code); 
    const isExist = this.state.cart.items.some((product) => product.code === item.code); // Поиск уже имеющегося товара в корзине
    
    // Если товара нет в корзине, он добавляется со значением quantity: 1, в противном случае - меняется количество товара
    !isExist
      ? this.setState({
          ...this.state,
          cart: {
            ...this.state.cart,
            items: this.state.cart.items.concat({ ...item, quantity: 1 }),
            totalAmount: this.state.cart.totalAmount += item.price,
            uniqueItems: this.state.cart.uniqueItems + 1 // Для того, чтобы компонент не высчитывал cart.length, а получал истинное значение из store
          }
        })
      : this.setState({
          ...this.state,
          cart: {
            ...this.state.cart,
            items: this.state.cart.items.map((product) =>
            product.code === code
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
          totalAmount: this.state.cart.totalAmount += item.price,
          }
        });
  }

  /**
   * Удаление товара из корзины
   * @param code {Number}
   */
  deleteItemFromCart(code) {
    const item = this.state.cart.items.find((product) => product.code === code)

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter((product) => product.code !== code),
        totalAmount: this.state.cart.totalAmount -= item.price * item.quantity,
        uniqueItems: this.state.cart.uniqueItems - 1
      }
    });
  }
}

export default Store;
