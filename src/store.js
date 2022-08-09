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
  createItem({code, title = 'Новая запись', selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, selected})
    });
  }

  /**
   * Изменение положения всплывающего модального окна
   */
  openPanel(isShown) {
    this.setState({
      ...this.state,
      isShown: true
    })
  }
  closePanel(isShown) {
    this.setState({
      ...this.state,
      isShown: false
    })
  }
  addItem(code) {
    const itemIndex = this.state.cartList.findIndex(
      (cartItem) => cartItem.code === code
    );
    let newOrder = null;
    if (itemIndex < 0) {
        const newItemIndex = this.state.items.findIndex(
          (cartItem) => cartItem.code === code
        );
        const newItem = {
            code,
            title: this.state.items[newItemIndex].title,
            price: this.state.items[newItemIndex].price,
            count: 1,
        };
        newOrder = [...this.state.cartList, newItem];
    } else {
        newOrder = this.state.cartList.map((cartItem, index) => {
            if (index === itemIndex) {
                return {
                    ...cartItem,
                    count: cartItem.count + 1,
                };
            } else {
                return cartItem;
            }
        });
    }
    this.setState({
        ...this.state,
        cartList: newOrder,
    });
  }
  /**
   * Удаление записи из корзины по её коду
   * @param code
   */
   deleteItem(code) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.code !== code)
    });
  }
}

export default Store;
