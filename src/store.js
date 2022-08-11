

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
   * @param code
   */

  addToCart(code) {
    const record = this.state.cart.find(item => item.code === code)
    if (record) {
      this.setState({
        ...this.state, cart: this.state.cart.map(oldRecord => {
          if (record === oldRecord) {
            return {
              ...record, count: record.count + 1
            }
          } else {
            return oldRecord
          }
        })
      })
    }
    else {
      const product = this.state.AVAILABLE_ITEMS.find(item => item.code === code)
      const newRecord = { code, ...product, count: 1 }
      this.setState({ ...this.state, cart: [...this.state.cart, newRecord] })
    }
  }

  deleteFromCart(code) {
    this.setState({ ...this.state, cart: this.state.cart.filter(item => item.code !== code) })
  }


  setModal(active) {
    this.setState({ ...this.state, isModalActive: (!this.state.isModalActive) })
  }

  /** 
 *  Функция, считающая сумму товаров их общую стоимость
 */

  getMeta(cart) {
    let cartlength = cart.length;
    let count = 0;
    let price = 0;
    for (const item of cart) {
      count += item.count;
      price += item.price * item.count;
    }
    return (
      [cartlength, count, price]
    )
  }

}


export default Store;
