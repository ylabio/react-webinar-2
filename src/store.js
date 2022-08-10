class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    this.state.basket = {
      goods: [],
      summ: 0,
    };
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

  addToBasket(code) {
    const product = this.getProduct(code);
    if (!product) return;
    const basket = this.state.basket;
    let isProductAdded = false;

    const resGoods = basket.goods.map((g) => {
      if (g.code === code) {
        isProductAdded = true;
        return { ...g, count: g.count + 1 };
      }
      return g;
    });

    if (!isProductAdded) resGoods.push({ ...product, count: 1 });

    this.setState({
      ...this.state,
      basket: {
        ...basket,
        goods: resGoods,
        summ: basket.summ + product.price,
      },
    });
  }

  removeFromBasket(code) {
    const basket = this.state.basket;
    let removedProduct;
    const resGoods = basket.goods.filter((p) => {
      if (p.code !== code) return true;
      else removedProduct = p;
    });
    if (!removedProduct) return;

    this.setState({
      ...this.state,
      basket: {
        goods: resGoods,
        summ: basket.summ - (removedProduct.count * removedProduct.price),
      },
    });
  }

  getProduct(code) {
    return this.getState().items.find((p) => p.code === code);
  }
}

export default Store;
