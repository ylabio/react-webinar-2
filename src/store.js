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
    };
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
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    const deletedItem = this.state.cart.items.find(i => i.code === code);
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter(i => i.code !== code),
        count: this.state.cart.count - 1,
        price: this.state.cart.price - deletedItem.count * deletedItem.price
      }
    });
  }

  /**
   * Добавление товара в корзину
   * @param item
   */
  addInCart(item) {
    let foundItem = this.state.cart.items.find(i => i.code === item.code);
    this.setState({
      ...this.state,
      cart: {
        items: foundItem
          ? this.state.cart.items.map(i =>
              i.code === foundItem.code ? {...i, count: i.count + 1} : i
            )
          : this.state.cart.items.concat(item),
        count: this.state.cart.count + !foundItem,
        price: this.state.cart.price + item.price
      }
    });
  }

  /**
   * Отображение или скрытие модалки
   */
  setPopupVisibility(visible) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        visible: visible
      }
    });
  }
}

export default Store;
