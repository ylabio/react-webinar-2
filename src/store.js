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
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  addItem(item) {
    if (
      ![...this.state.itemsBuy].map((item) => item.code).includes(item.code)
    ) {
      this.setState({
        ...this.state,
        itemsBuy: [...this.state.itemsBuy, { ...item, total: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        itemsBuy: [
          ...this.state.itemsBuy.map((i) =>
            i.code === item.code ? { ...i, total: i.total + 1 } : i
          ),
        ],
      });
    }

    this.setState({
      ...this.state,
      allItems: [...this.state.itemsBuy].length,
      allPrice: [...this.state.itemsBuy].reduce(
        (acc, curr) => acc + curr.price * curr.total,
        0
      ),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      itemsBuy: this.state.itemsBuy.filter((item) => item.code !== code),
    });
    this.setState({
      ...this.state,
      allItems: [...this.state.itemsBuy].length,
      allPrice: [...this.state.itemsBuy].reduce(
        (acc, curr) => acc + curr.price * curr.total,
        0
      ),
    });
  }
}

export default Store;
