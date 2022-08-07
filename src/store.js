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
    const index = this.state.basket.findIndex(elem => elem.code === item.code);
    if (index!== -1) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map(((elem) => {                
          if (elem.code === item.code) {
            return {
              ...elem,
              count: ++elem.count  
            }
          }
          return elem;
        }))
      })
    } else {
      this.setState({
        ...this.state,
        basket: this.state.basket.concat({...item, count: 1}),
      });
    }
  }

  /**
   * Удаление товара из корзины
   */
  deleteFromBasket(itemCode) {
    this.setState({
        ...this.state,
        basket: this.state.basket.filter(elem => elem.code !== itemCode)
      });
  }

  /**
   * Получение общей суммы товаров в корзине
   */
  totalSum() {
    return this.state.basket.reduce((sum, current) => sum + current.price * current.count, 0);
  }

}

export default Store;
