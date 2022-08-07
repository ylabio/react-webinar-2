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

  addItemToCart(item) {
    const goods = JSON.parse(JSON.stringify(this.state.goods));
    goods.price += item.price;

    if (item.code in goods.items) {
      goods.items[item.code].quantity++;
      goods.items[item.code].price += item.price;
      goods.items[item.code].time = Date.now();
    } else {
      goods.items[item.code] = {
        quantity: 1,
        price: item.price,
        data: item,
        time: Date.now(),
      };
      goods.total++;
    }

    this.setState({
      ...this.state,
      goods,
    });
  }

}

export default Store;
