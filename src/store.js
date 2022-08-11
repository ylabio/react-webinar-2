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

  addSumm(price) {
    this.setState({
      ...this.state,
      summBasket: this.state.summBasket + price
    })
  }
  addCountBasket(price) {
    this.setState({
      ...this.state,
      countPositionBasket: this.state.countPositionBasket + 1
    })
  }

  delSumm(amount, price) {

    this.setState({
      ...this.state,
      summBasket: this.state.summBasket - amount * price
    })
  }
  delCountBasket() {
    this.setState({
      ...this.state,
      countPositionBasket: this.state.countPositionBasket - 1
    })
  }
  /**
   * Добавление товара в корзину
   */
  createItem({ code, title, price, amount = 1 }) {
    if (this.state.itemsBasket.find(id => id.code === code)) {
      this.addSumm(price)
      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.map(item => {
          if (item.code == code) {
            return {
              ...item,
              amount: item.amount + 1
            }
          }
          return item;
        })
      })
    }
    else (
      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.concat({ code, title, price, amount }),
      }),

      this.addSumm(price),
      this.addCountBasket()
    )
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code, amount, price ) {
    
    this.delCountBasket(amount,price)
    this.delSumm(amount, price)

      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.filter(item => (item.code !== code))
      });
  }

}

export default Store;
