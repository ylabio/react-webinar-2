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
   * Выбор отсортированной по дате корзины
   * @return {Object}
   */
  getSortedCart() {
    return this.state.cart.sort(
      (prev, next) => prev.additionDate - next.additionDate
    );
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
  createItem({ code, title = "Новый товар", price = 999, selected = false }) {
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
          };
        }
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  addItemToCart(code) {
    const currentItem = this.state.items.find((item) => item.code === code);
    const itemInCart = this.state.cart.find((item) => item.code === code);
    const date = new Date().getTime();
    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              amount: item.amount + 1,
              additionDate: date,
            };
          }
          return item;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({
          ...currentItem,
          amount: 1,
          additionDate: date,
        }),
      });
    }
  }

  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
    });
  }
}

export default Store;
