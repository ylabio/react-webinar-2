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
   * Удаления товара с корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      itemsModal: this.state.itemsModal.filter(item => item.code !== code)
    });
  }
  /**
   * Добавление товара в корзину
   * @param item
   */
  addToModal(item) {
    const itemIsInModal = this.state.itemsModal.some(
        (el) => el.code === item.code
    );
    if (!itemIsInModal) {
      this.setState({
        ...this.state,
        itemsModal: [...this.state.itemsModal, { ...item, amount: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        itemsModal: this.state.itemsModal.map((product) => {
          if (product.code === item.code) {
            return { ...product, amount: ++product.amount };
          } else {
            return product;
          }
        }),
      });
    }
  }
}

export default Store;
