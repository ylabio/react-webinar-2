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
  addBasket({ code, title = 'Новый товар', price = 999, amountInBasket = 0 }) {
    this.setState({
      ...this.state,
      basket: this.state.basket.concat({ code: code, title: title, price: price, amountInBasket: amountInBasket })
    });

  }
  /**
 * Счетчик товара в корзине
 * @param code
 */
  amountInBasket(code) {
    this.setState({
      ...this.state,
      baket: this.state.basket.map(basketElement => {
        if (basketElement.code === code) {
          return {
            ...basketElement,
            amountInBasket: basketElement.amountInBasket += 1,
          }
        }
        return {
          ...basketElement,

        }
      })
    })
  }
  /**
   * Счетчик уникальных товаров в корзине
   */
  counterProduct() {
    this.setState({
      ...this.state,
      amountProduct: this.state.amountProduct += 1
    })
  }
  /**
 * Счетчик полной цены за  все товары
 * @param code
 */
  priceProduct(price) {
    this.setState({
      ...this.state,
      priceProduct: this.state.priceProduct += price
    })
  }
  /**
   * Удаление товара  по её коду
   * @param code,amountInBasket, price
   */
  deleteItem(code, amountInBasket, price) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code),
      priceProduct: this.state.priceProduct -= (price * amountInBasket),
      amountProduct: this.state.amountProduct -= 1,
    });

  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.map(item => {
  //       if (item.code === code) {
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1
  //         }
  //       }
  //       return item.selected ? { ...item, selected: false } : item;
  //     })
  //   });
  // }
}

export default Store;
