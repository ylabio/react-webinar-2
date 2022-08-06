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
  createItem({ code, title = "Новый товар", price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.code !== code),
    });
  }

  /**
   * Удаление записи в корзину по её коду
   * @param code
   */
  addItem(code) {
    if (this.state.card.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        card: this.state.card.map((item) => {
          if (item.code === code) {
            return {
              code,
              title: item.title,
              price: item.price,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
    } else {
      const newItem = this.state.items.find((item) => item.code === code);
      this.setState({
        ...this.state,
        card: this.state.card.concat({
          code,
          title: newItem.title,
          price: newItem.price,
          count: 1,
        }),
      });
    }
  }
  onModalClose() {
    this.setState({
      ...this.state,
      modal: false,
    });
  }
  showModal() {
    this.setState({
      ...this.state,
      modal: true,
    });
  }

  /**
   * Удаление записи из корзины по её коду
   * @param code
   */
  deleteCardItem(code) {
    this.setState({
      ...this.state,
      card: this.state.card.filter((item) => item.code !== code),
    });
  }
}

export default Store;
