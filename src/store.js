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

  /**
   * Создание записи
   */
  addToCart(code) {
    if (this.state.basket.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) =>
          item.code === code ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      const newItem = this.state.items.find((item) => item.code === code);

      this.setState({
        ...this.state,
        basket: [...this.state.basket, { ...newItem, quantity: 1 }],
      });
    }
    this.getOverall();
  }

  /**
   * Удаление записи
   * @param code
   */
  removeItemToCart(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== code),
    });
    this.getOverall();
  }

  /**
   * Получение общей цены
   * @param code
   */

  getOverall() {
    let { overall, quantity } = this.state.basket.reduce(
      (basketOverall, basketItem) => {
        const { price, quantity } = basketItem;
        basketOverall.overall += price * quantity;
        basketOverall.quantity += quantity;

        return basketOverall;
      },
      { overall: 0, quantity: 0 }
    );

    this.setState({
      ...this.state,
      overall,
      quantity,
    });
  }

  openToCart() {
    this.setState({ ...this.state, modalOpen: true });
  }

  closeToCart() {
    this.setState({ ...this.state, modalOpen: false });
  }
}

export default Store;
