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
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected })
    });
  }

  /**
   * Переключение "флага" модального окна
   */
  modalTogge() {
    this.setState({
      ...this.state,
      isModalActive: !this.state.isModalActive
    })
  }

  /**
   * Удаление товара из корзины по его коду
   * @param code
   */
  removeItemFromBasket(code) {

    this.setState({
      ...this.state,
      basketItems:
        this.state.basketItems.filter(item => item.code !== code),
      basketUniqueItems:
        this.state.basketUniqueItems.filter(item => item.code !== code)
    })
  }

  /**
   * Добавление товара в корзину по его коду
   * @param code
   */
  addItemToBasket(code) {

    let item = this.state.items.find(item => item.code === code);
    let itemInBasket = this.state.basketUniqueItems.find(item => item.code === code);

    if (itemInBasket === undefined) {
      this.setState({
        ...this.state,
        basketItems:
          this.state.basketItems.concat(item),
        basketUniqueItems:
          this.state.basketUniqueItems.concat(item),
      });
    }
    else if (itemInBasket !== undefined) {
      this.setState({
        ...this.state,
        basketItems:
          this.state.basketItems.concat(item)
      });

    }
  }
}

export default Store;
