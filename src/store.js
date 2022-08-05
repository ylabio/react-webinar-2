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
   * Удаление записи по её коду
   * @param code
   */
  deleteBasketItem(code) {
    const basketItems = this.state.basket.basketItems.filter(item => item.code !== code)
    
    const totalSum = basketItems.reduce((sum, item) => {
      return item.amount * item.price + sum
    }, 0)


    this.setState({
      ...this.state,
      basket: {
        count: basketItems.length,
        totalSum,
        basketItems
      }
    });
  }

  /**
   * Добавление товара в корзину, счет суммы и количества товара
   * @param code
   */
  addItem(code) {
    const shopItem = this.state.items.find(item => item.code === code);

    const basketItem = {
      ...shopItem,
      amount: 1
    }

    let isItemAdded = false;
    
    const basketItems = this.state.basket.basketItems.map(item => {
      if (item.code === code){
        isItemAdded = true;
        return {...item, amount: item.amount + 1}
      }
      return item
    });

    if (!isItemAdded) {
    basketItems.push(basketItem)
    }

    const totalSum = basketItems.reduce((sum, item) => {
      return item.amount * item.price + sum
    }, 0)
    
    this.setState({
      ...this.state,
      basket: {
        count: basketItems.length,
        totalSum,
        basketItems
      }
    });
  }
}

export default Store;
