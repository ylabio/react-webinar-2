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
    const itemIsInBasket = this.state.itemsBasket.list.some(
      (el) => el.code === item.code
    );
    if (!itemIsInBasket) {
      this.setState({
        ...this.state,
        itemsBasket: {
          list: [...this.state.itemsBasket.list, { ...item, amount: 1 }],
        },
      });
    } else {
      this.setState({
        ...this.state,
        itemsBasket: {
          list: [
            ...this.state.itemsBasket.list.map((product) => {
              if (product.code === item.code) {
                return { ...product, amount: product.amount + 1 };
              } else {
                return product;
              }
            }),
          ],
        },
      });
    }
    this.#setTotalBasket();
  }

  /* Приватный метод, осуществляющий вычисление общего количества товаров в корзине и общей стоимости всех товаров в корзине. */
  #setTotalBasket = () => {
    this.setState({
      ...this.state,
      itemsBasket: {
        ...this.state.itemsBasket,
        total: {
          ...this.state.itemsBasket.total,
          amount: this.state.itemsBasket.list.length,
          price: this.state.itemsBasket.list
            .map((item) =>
              item.price && item.amount ? item.price * item.amount : 0
            )
            .reduce((prev, value) => prev + value, 0),
        },
      },
    });
  };

  /**
   * Удаление товара из корзины по его коду
   * @param code
   */
  deleteItemFromBasket(code) {
    this.setState({
      ...this.state,
      itemsBasket: {
        list: [
          ...this.state.itemsBasket.list.filter((item) => item.code !== code),
        ],
        total: {
          ...this.state.itemsBasket.total,
        },
      },
    });
    this.#setTotalBasket();
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
