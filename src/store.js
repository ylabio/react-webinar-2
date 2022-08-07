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
  addToBasket(item) {
    const { title, code, price } = item;
    let count = 1;
    if (!this.state.basket.length) {
      this.setState({
        ...this.state,
        basket: this.state.basket.concat({ code, title, price, count })
      });
    } else {
      this.state.basket.find(value => value.code === item.code) ?
        this.setState({
          ...this.state,
          basket: this.state.basket.map(value => {
            if (value.code === item.code) {
              return {
                ...value,
                count: value.count += 1
              }
            }
            return value
          })
        })
        :
        this.setState({
          ...this.state,
          basket: this.state.basket.concat({ code, title, price, count })
        });
    }
  }

  /**
   * Удаление записи по её коду из корзины
   * @param code
   */
  deleteItem(item) {
    const { code } = item;
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
  }


}

export default Store;
