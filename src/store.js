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
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code),
    });
  }

    /**
   * Добавление записи в корзину по её коду
   * @param code
   */
  addItemInBasket(code) {
    const basketWithItem = this.state.basket.filter(item => item.code === code);
    const itemForAdd = this.state.items.filter(item => item.code === code)[0];
    if (!basketWithItem.length) {
      this.setState({
        ...this.state,
        basket: [...this.state.basket, {code: itemForAdd.code, title: itemForAdd.title, price: itemForAdd.price, num: 1}],
      })
    } else {
        this.setState({
          ...this.state,
          basket: this.state.basket.map(item => item.code === code ? 
            ({...item, price: item.price + itemForAdd.price, num: item.num + 1 }) 
          : 
            item),
      })
    }
  }

    /**
   * Изменение видимости модального окна
   * @param code
   */
  changeModalVisible(isVisible) {
    this.setState({
      ...this.state,
      modalVisible: isVisible
    })
  }

       /**
   * Изменение общей стоимости товаров в корзине
   * @param code
   */
  changeTotalPrice() {
    this.setState({
      ...this.state,
      totalPrice: this.state.basket.reduce((a, b) => a + b.price, 0)
    })
  }      
}

export default Store;
