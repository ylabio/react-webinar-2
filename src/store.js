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

  /**
   * Добавляем товар в корзину
   * @param newItem
   */
  addItemToCart(newItem) {
    // проверяем, есть ли товар уже в корзине
    const itemIsAlreadyInTheCart = this.state.cart.some((item) => {
      return newItem.code === item.code;
    });

    this.setState({
      ...this.state,
      cart: itemIsAlreadyInTheCart
        ? this.state.cart.map((item) => {
            if (item.code === newItem.code) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          })
        : this.state.cart.concat({
            ...newItem,
            quantity: 1,
          }),
    });
  }

  deleteItemFromCart(deleteItem) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => {
        return item.code !== deleteItem.code;
      }),
    });
  }

  /**
   * Получить сумму товаров и их кол-во в корзине
   */
  getCartInfo() {
    let price = 0;
    let quantity = 0;

    this.getState().cart.forEach((item) => {
      price += item.price * item.quantity;
      quantity += item.quantity;
    });

    return { price, quantity };
  }
}

export default Store;
