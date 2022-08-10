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
   * @param code
   */
  addToCart(code) {
    if (this.state.cartItems.some(cartItem => cartItem.code === code)) {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map(cartItem => {
          if (cartItem.code === code) {
            return {
              ...cartItem,
              amount: cartItem.amount+=1
            }
          }
          return cartItem
        })
      });
    } else {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.concat({...this.state.items.find(item => item.code === code), amount: 1} )
      });
    }

    this.setCart();
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code)
    });

    this.setCart();
  }

  /**
   * Пересчет суммы и кол-ва уникального товара в корзине, вызывается внутри методов addToCart, deleteFromCart
   */
  setCart() {
    this.setState({
      ...this.state,
      sumTotal: this.state.cartItems.reduce((acc, item) => acc + item.price * item.amount, 0),
      amountUnique: this.state.cartItems.length
    })
  }
}

export default Store;
