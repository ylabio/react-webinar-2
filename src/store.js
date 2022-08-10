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
    };
  }

  /**
   * Добавление товара в корзину
   * @param code {number}
   * @param title {string}
   * @param price {number}
   */
  addToBasket(code, title, price) {
    let isAvailable;
    const newBasket = this.state.basket.map(product => {
      if (product.code === code) {
        isAvailable = true;
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    this.setState({
      ...this.state,
      basket: isAvailable
        ? newBasket
        : [...this.state.basket, { code, title, price, quantity: 1 }],
    });

    this.setTotalBasketCost(this.state.basket);
    !isAvailable && this.setUniqueGoodsCount('increase');
  }

  /**
   * Удаление товара из корзины
   * @param code {number}
   */
  removeFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(product => product.code !== code)
    });

    this.setTotalBasketCost(this.state.basket);
    this.setUniqueGoodsCount('decrease');
  }

  /**
   * Вычисление общей стоимости товаров в корзине
   * @param basket {Object[]}
   */
  setTotalBasketCost(basket) {
    const totalCost = basket.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.quantity;
    }, 0);
    const totalBasketCost = new Intl.NumberFormat('ru').format(totalCost);

    this.setState({ ...this.state, totalBasketCost });
  }

  /**
   * Установка количества уникальных товаров в корзине
   * @param actionType {string}
   */
  setUniqueGoodsCount(actionType) {
    if (actionType === 'increase') {
      this.setState({ ...this.state, uniqueGoodsCount: ++this.state.uniqueGoodsCount });
    } else if (actionType === 'decrease') {
      this.setState({ ...this.state, uniqueGoodsCount: --this.state.uniqueGoodsCount });
    }
  }
}

export default Store;
