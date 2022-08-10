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
   * Удаление записи из корзины по её коду
   * @param code
   */
  deleteItem(code) {
    const itemInBasket = this.state.basket.find(item => item.code === code);
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code),
      numUniqueItems: this.state.numUniqueItems - 1,
      totalPrice: this.state.totalPrice - itemInBasket.totalPrice
    });
  }

  /**
   * Добавление записи в корзину по её коду
   * @param code
   */
  addItemInBasket(code) {
    const itemInBasket = this.state.basket.find(item => item.code === code);
    if (itemInBasket) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map(item => item.code === code ? 
          ({...item, totalPrice: item.totalPrice + item.price, num: item.num + 1}) 
        : 
          item),
        totalPrice: this.state.totalPrice + itemInBasket.price
      })
    } else {
        const itemForAdd = this.state.items.find(item => item.code === code);
        this.setState({
          ...this.state,
          basket: [...this.state.basket, {code: itemForAdd.code, title: itemForAdd.title, price: itemForAdd.price, totalPrice: itemForAdd.price, num: 1}],
          numUniqueItems: this.state.numUniqueItems + 1,
          totalPrice: this.state.totalPrice + itemForAdd.price
        }) 
     }
  }

    /**
   * Изменение видимости модального окна
   * @param isVisible
   */
  changeModalVisible(isVisible) {
    this.setState({
      ...this.state,
      modalVisible: isVisible
    })
  }
  
}

export default Store;
