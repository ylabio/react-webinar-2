import item from "./components/item";

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
   * Добавление записи в корзину
   * @param cartItem
   */
  addToCartItem(itemId) {
    const cartItem = this.state.items.find(item => item.code === itemId);  

    this.setState({
      ...this.state,
      cart: {
      ...this.state.cart,
      cartItems: this.state.cart.cartItems[itemId] ?
        {...this.state.cart.cartItems, [itemId]: {...cartItem, count: this.state.cart.cartItems[itemId].count + 1}} : 
        {...this.state.cart.cartItems, [itemId]: {...cartItem, count: 1}},
      totalPrice: this.state.cart.totalPrice + cartItem.price,    
      }   
    })   
  }

  /**
   * Удаление записи из корзины
   * @param code
   */
  deleteItemsFromCart(item) {
    const cartItems = {...this.state.cart.cartItems}; 

    delete cartItems[item.code]
  
    this.setState({ 
      ...this.state,
      cart:  {...this.state.cart, 
      cartItems: {...cartItems},
      totalPrice: this.state.cart.totalPrice - (item.price * item.count)}   
    });
  }
}

export default Store;