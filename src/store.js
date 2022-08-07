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
      cart: this.state.cart.filter(item => item.code !== code)
    });
  }

  updateItem(item, itemInCart, cart) {
    
    if (itemInCart) {
      return {
        ...itemInCart, 
        count:  itemInCart.count + 1
      }
    } else {
      let i = 1
      i =+ 1
      return {
        ...item,
        code: cart.length + 1,
        count: 1
      }
    }
  }

  updateCart(cart, newItem, index) {
    if (index === -1) {
      return [...cart, newItem];
    }
    return [...cart.slice(0, index), newItem, ...cart.slice(index + 1)];
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  addItemToCart(code) {
    const { cart } = this.state;

    const getItem = this.state.items.find(item => item.code === code);
    const getItemIndex = cart.findIndex(item => item.code === code);
    const itemInCart = cart[getItemIndex];

    const newItem = this.updateItem(getItem, itemInCart, this.state.cart)
    const newArray = this.updateCart(cart, newItem, getItemIndex);

    this.setState({
      
      ...this.state,
      
      cart: [...newArray]
      
    });
  }
}

export default Store;
