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
  addItemToCart(item) {
    let newCart = [...this.state.cart];
    if(newCart.length >= 1) {
      for(let i = 0; i < newCart.length; i++) {
        if(newCart[i].code === item.code) {
          newCart[i].count++;
          break;
        } else {
          if(i === this.state.cart.length - 1) {
            item.count = 1;
            newCart.push(item);
            break;
          }
        }
      }
    } else {
      newCart.push({...item, count: 1});
    }
    this.setState({
      ...this.state,
      cart: newCart,
      totalCartPrice: this.state.totalCartPrice + item.price,
    });
  }
  /**
   * Удаление товара из корзины
   * @param code
   */
   deleteItemFromCart(item) {
    let newCart = [];
    for(let i = 0; i < this.state.cart.length; i++) {
      if(this.state.cart[i].code === item.code) {
        if(this.state.cart[i].count > 1) {
          newCart.push({...this.state.cart[i], count: this.state.cart[i].count - 1})
        }
      } else {
        newCart.push(this.state.cart[i])
      }
    }
    this.setState({
      ...this.state,
      cart: newCart,
      totalCartPrice: this.state.totalCartPrice - item.price,
    })
  }
}

export default Store;
