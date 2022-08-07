import {cartCounter} from "./utils";

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
   * Добавление товара в корзину
   */
  
  addItemToCart({title, price}) {
    const findItemIndex = this.state.cartItems.findIndex(item => item.title === title)
    if (findItemIndex === -1) {
      const code = cartCounter()
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.concat({code: code, title: title, price: price, quantity: 1})
      });
    } else {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map(item => {
          if (item.title === title) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          } else {
            return item
          }
        })
      })
    }
  }
  
  
  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code)
    });
  }
}

export default Store;
