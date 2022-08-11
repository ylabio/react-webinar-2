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
   * @param code
   */
  deleteItem(code, isCartItem) {
    this.setState(isCartItem
      ? {...this.state,
      cart: this.state.cart.filter(item => item.code !== code)}
      : {...this.state,
      item: this.state.item.filter(item => item.code !== code)});
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1
          }
        }
        return item.selected ? {...item, selected: false} : item;
      })
    });
  }

  addToCart(code) {
    const newCartItem = this.state.items.filter(item => item.code === code)[0];
    if (this.state.cart.length === 0) {
      this.setState({
        ...this.state,
        cart: [{...newCartItem, amount: 1}]
      })
    } else {
      const isItemAlreadyInCart = Boolean(this.state.cart.filter(item => item.code === code).length);
      this.setState({
        ...this.state,
        cart: isItemAlreadyInCart
          ? this.state.cart.map(item => {
            if (item.code === code) {
              return {...item, amount: item.amount += 1}
            }
            return item;
          })
          : [...this.state.cart, {...newCartItem, amount: 1}]
      })
    }
  }
}

export default Store;
