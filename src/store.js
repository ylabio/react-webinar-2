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
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
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
  /**
   * Добавление товара в корзину
   * @param item
   */
  addItemToCart(item) {
    let newCart = [...this.state.cart];
    let itemIndex = this.state.cart.findIndex((elem) => elem.code === item.code);
    if(itemIndex !== -1) {
      newCart[itemIndex].count++;
    } else newCart.push({...item, count: 1});
    this.setState({
      ...this.state,
      cart: newCart,
      totalCartPrice: this.state.totalCartPrice + item.price,
      totalCartItemsCount: this.state.totalCartItemsCount + (itemIndex === -1 ? 1 : 0),
    });
  }
  /**
   * Удаление товара из корзины
   * @param item
   */
   deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((cartItem) => cartItem.code !== item.code),
      totalCartPrice: this.state.totalCartPrice - (item.price * item.count),
      totalCartItemsCount: this.state.totalCartItemsCount - 1,
    })
  }
}

export default Store;
