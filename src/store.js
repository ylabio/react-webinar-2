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
    let isAvailable, basket, uniqueGoodsCount;

    const tempBasket = this.state.basket.map(product => {
      if (product.code === code) {
        isAvailable = true;
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    if (isAvailable) {
      basket = tempBasket;
      uniqueGoodsCount = this.#setUniqueGoodsCount('default');
    } else {
      basket = [...this.state.basket, { code, title, price, quantity: 1 }];
      uniqueGoodsCount = this.#setUniqueGoodsCount('increase');
    }

    const totalBasketCost = this.#setTotalBasketCost(basket);

    this.setState({
      ...this.state,
      basket,
      totalBasketCost,
      uniqueGoodsCount
    });
  }

  /**
   * Удаление товара из корзины
   * @param code {number}
   */
  removeFromBasket(code) {
    const basket = this.state.basket.filter(product => product.code !== code);
    const totalBasketCost = this.#setTotalBasketCost(basket);
    const uniqueGoodsCount = this.#setUniqueGoodsCount('decrease');

    this.setState({
      ...this.state,
      basket,
      totalBasketCost,
      uniqueGoodsCount
    });
  }

  /**
   * Возврат общей стоимости товаров в корзине
   * @param basket {Object[]}
   */
  #setTotalBasketCost(basket) {
    const totalBasketCost = basket.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price * currentValue.quantity;
    }, 0);
    return new Intl.NumberFormat('ru').format(totalBasketCost);
  }

  /**
   * Возврат количества уникальных товаров в корзине
   * @param actionType {string}
   */
  #setUniqueGoodsCount(actionType) {
    switch (actionType) {
      case 'increase':
        return ++this.state.uniqueGoodsCount;
      case 'decrease':
        return --this.state.uniqueGoodsCount;
      default:
        return this.state.uniqueGoodsCount;
    }
  }
}

export default Store;
