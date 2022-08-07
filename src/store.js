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
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected })
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

  /**
   * Добавления товара в корзину
   */
  addItemToCart(item) {
    if (!this.state.itemsCart.length) {
      this.setState({
        ...this.state,
        itemsCart: [{ ...item, sumPrice: item.price, count: 1 }]
      })
    } else {
      this.setState({
        ...this.state,
        itemsCart: this.state.itemsCart.find(i => i.code === item.code)
          ? this.state.itemsCart.map(itemCart => {
            if (itemCart.code === item.code) {
              return { ...itemCart, sumPrice: itemCart.price * (itemCart.count + 1), count: itemCart.count + 1 }
            } else {
              return itemCart;
            }
          })
          : [...this.state.itemsCart, { ...item, sumPrice: item.price, count: 1 }]
      })
    }
  }
}

export default Store;
