import {getSumPrice} from "./utils";

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
   * Удаление записи по её коду
   * @param code
   */
  deleteProductFromCart(code) {
    this.setState({
      ...this.state,
      userProducts: this.state.userProducts.filter(item => item.code !== code)
    });
  }

  /**
   * Добавление товара в корзину
   * @param code код товара
   * @param count количество добавляемое в корзину
   */
  addProductToCart(code, count) {
    const item = this.state.items.find((item) => {
      return item.code === code
    });
    const isItemInCart = this.state.userProducts.some((cartItem) => {
      return cartItem.code === code
    })

    this.setState({
      ...this.state,
      userProducts: isItemInCart
        ? this.state.userProducts.map((cartItem) => {
            if (cartItem.code === code) {
              return {...item, quantity: count + cartItem.quantity}
            }
            return cartItem;
          })
        : this.state.userProducts.concat([{...item, quantity: count}])
    });
  }

  getSumPrice() {
    return getSumPrice(this.state.userProducts);
  }

  getNumberOfPositions () {
   return this.state.userProducts.length
  }
}

export default Store;
