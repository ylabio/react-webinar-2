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
   * Создание записи
   */
  createItem({ code, title = "Новый товар", price = 999 }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price }),
    });
  }

  /**
   * Добавление записи в корзину по её коду
   * @param code
   */

  addCartItem(code) {
    const inCart = this.getState().cart.map((item) => item.code);
    const currentItem = this.getState().items.find(
      (item) => item.code === code
    );
    let cartItem = this.getState().cart.map((item) => item.code);
    if (currentItem.code === code) {
      cartItem = this.getState().cart.map((item) => {
        if (item.code !== currentItem.code) {
          return item;
        } else {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
      });
      if (!inCart.includes(code)) {
        cartItem.push({ ...currentItem, amount: 1 });
      }
      const totalPrice = cartItem.reduce((prev, curr) => {
        return prev + curr.price * curr.amount;
      }, 0);
      const totalCount = cartItem.reduce((prev, curr) => {
        return prev + curr.amount;
      }, 0);
      this.setState({
        ...this.state,
        cart: cartItem,
        totalCartPriceAndCount: {
          price: totalPrice,
          count: totalCount,
        },
      });
    }
  }

  /**
   * Удаление записи из корзину по её коду
   * @param code
   */
  //
  // deleteFromCart(code) {
  //   const target = this.getState().cart.find((item) => item.code === code);
  //   const totalPrice =
  //     this.getState().totalCartPriceAndCount.price -
  //     target.price * target.amount;
  //   const totalCount =
  //     this.getState().totalCartPriceAndCount.count - target.amount;
  //   this.setState({
  //     ...this.state,
  //     cart: this.state.cart.filter((item) => item.code !== code),
  //     totalCartPriceAndCount: {
  //       price: totalPrice,
  //       count: totalCount,
  //     },
  //   });
  // }

  deleteFromCart(code) {
    const target = this.getState().cart.find((item) => item.code === code);
    const totalPrice =
      this.getState().totalCartPriceAndCount.price -
      target.price * target.amount;
    const totalCount = this.getState().totalCartPriceAndCount.count - 1;
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
      totalCartPriceAndCount: {
        price: totalPrice,
        count: totalCount,
      },
    });
  }
}

export default Store;
