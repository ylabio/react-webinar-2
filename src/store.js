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
   * Удаление записи по её коду
   * @param item
   */
  deleteItem(item) {
    const deleteItem = this.state.cartItems.filter(itemFilter => itemFilter.title === item.title)[0];
    
    if (deleteItem.count <= 1) {
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems.filter(item => item.title !== deleteItem.title)]
      });
    } else {
      deleteItem.count--;
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems.filter(item => item.title !== deleteItem.title), deleteItem]
      });
    }
  }

  /**
   * Добавление товара в корзину
   * @param item
   */
  selectItem(item) {
    const newItem = item;
    const isProductExists = ()=>{return this.state.cartItems.filter(item => item.title === newItem.title).length !== 0};
    if (isProductExists() == true) {
      const existsItem = this.state.cartItems.filter(item => item.title === newItem.title)[0];
      existsItem.count++;
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems.filter(item => item.title !== newItem.title), existsItem]
      });
    } else {
      newItem.count = 1;
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems, newItem]
      });
    }
  }
}

export default Store;
