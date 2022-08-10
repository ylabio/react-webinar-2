class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Элементы в корзине
    this.state.itemsInCart = [];
    // Сумма элементов в корзине
    this.state.allPriceItemsInCart = 0;
    // Количество уникальных товаров в корзине
    this.state.sumItemsInCart = 0;
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

  // Добавление элемента в корзину
  addItemToCart(code) {
    // добавляемый элемент
    const addedItem = this.state.items.find(item => item.code === code);

    if (!this.state.itemsInCart.find(item => item.code === addedItem.code)) {
      this.setState({
        ...this.state,
        // добавление товара в корзину
        itemsInCart: [
          ...this.state.itemsInCart,
          {...addedItem, count: 1}
        ],
        // добавление суммы товара к общей сумме корзины
        allPriceItemsInCart: this.state.allPriceItemsInCart + addedItem.price,
        // добавление товара к количеству уникальных товаров в корзине
        sumItemsInCart: this.state.sumItemsInCart + 1,
      })
    } else {
      this.setState({
        ...this.state,
        // увеличение количества уже добавленного товара
        itemsInCart: this.state.itemsInCart.map(item => {
          return item.code === addedItem.code ? {...item, count: item.count+1} : item;
        }),
        // добавление суммы товара к общей сумме корзины
        allPriceItemsInCart: this.state.allPriceItemsInCart + addedItem.price,
      })
    }
  }

  // Удаление элемента из корзины
  deleteItemFromCart(code) {
    // удаляемый элемент
    const removeItem = this.state.itemsInCart.find(item => item.code === code);

    this.setState({
      ...this.state,
      // удаление товара из корзины
      itemsInCart: this.state.itemsInCart.filter(item => item.code !== removeItem.code),
      // удаление суммы товара из общей суммы корзины
      allPriceItemsInCart: this.state.allPriceItemsInCart - (removeItem.price * removeItem.count),
      // удаление товара из общего количества уникальных товаров в корзине
      sumItemsInCart: this.state.sumItemsInCart - 1,
    });
  }
}

export default Store;
