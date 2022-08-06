class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
    this.summ = 0;
    this.counter = 0;
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
  createItem({ code, title, price, amount = 1 }) {
    if (this.state.itemsBasket.find(id => id.code === code)) {
      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.map(item => {
          if (item.code == code) {
            this.summ = this.summ + item.price; // Добавление суммы в корзину
            return {
              code,
              title: item.title,
              price: item.price,
              amount: item.amount + 1
            }
          }
          return item
        })
      })
    }
    else (
      this.summ = this.summ + price,
      this.counter = this.counter + 1,
      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.concat({ code, title, price, amount })
      })
    )
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.counter = this.counter - 1,
      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.filter(item => {
          if (item.code !== code) {
            return item
          } else {
            this.summ = this.summ - item.amount * item.price
          }
        })
      });
  }

}

export default Store;
