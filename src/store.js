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
   * Добавление товара в корзину
   * @param item - товар, который добавляется в корзину
   */
  addToBasket(item) {
    const itemIsInBasket = this.state.itemsBasket.some(
      (el) => el.code === item.code
    );

    if (!itemIsInBasket) {
      this.setState({
        ...this.state,
        itemsBasket: [...this.state.itemsBasket, { ...item, amount: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        itemsBasket: this.state.itemsBasket.map((product) => {
          if (product.code === item.code) {
            return { ...product, amount: ++product.amount };
          } else {
            return product;
          }
        }),
      });
    }
  }

  /**
   * Удаление товара из корзины по его коду
   * @param code
   */
  deleteItemFromBasket(code) {
    this.setState({
      ...this.state,
      itemsBasket: this.state.itemsBasket.filter((item) => item.code !== code),
    });
  }
  /**
   * Переключает состояние отображения модального окна (корзины товаров).
   */
  toggleShowBasket() {
    this.setState({
      ...this.state,
      isShowBasket: !this.state.isShowBasket,
    });
  }
}

export default Store;
