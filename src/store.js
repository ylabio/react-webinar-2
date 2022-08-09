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
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
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
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  addToCart(code) {
    const inCart = this.state.cart.cartItems.map((item) => item.code);

    if (!inCart.includes(code)) {
      const [choosenItem] = this.state.items.filter(
        (item) => item.code === code
      );
      this.setState({
        ...this.state,
        cart: {
          cartItems: [
            ...this.state.cart.cartItems,
            { ...choosenItem, amount: 1 },
          ],
          totalPrice: this.state.cart.totalPrice + choosenItem.price,
          totalAmount: this.state.cart.cartItems.length + 1,
        },
      });
    } else {
      this.state.cart.cartItems.forEach((item) => {
        if (item.code === code) {
          item.amount += 1;
          this.setState({
            ...this.state,
            cart: {
              ...this.state.cart,
              totalPrice: this.state.cart.totalPrice + item.price,
            },
          });
        }
      });
    }
  }

  deleteFromCart(code) {
    const deletedItem = this.state.cart.cartItems.find(
      (item) => item.code === code
    );

    this.setState({
      ...this.state,
      cart: {
        cartItems: [
          ...this.state.cart.cartItems.filter((item) => item.code !== code),
        ],
        totalPrice:
          this.state.cart.totalPrice - deletedItem.price * deletedItem.amount,
        totalAmount: this.state.cart.cartItems.length - 1,
      },
    });
  }
}

export default Store;
