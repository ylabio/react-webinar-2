
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
   * Переключатель модального окна
   * 
   */
  modalToggle() {
    this.setState({
      ...this.state,
      modalToggle: !this.state.modalToggle 
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItem(code, title, price) {

    const chosenElem = this.state.chosenItems.find((item) => item.code === code);

    if(chosenElem) {
      this.setState({
        ...this.state,
        chosenItems: this.state.chosenItems.map(item => {
          if(item.code === code) {
            return {...item, count: ++item.count}
          } else {
            return item
          } 
        }),
      })
    } 
    else {
      this.setState({
        ...this.state,
        amountOfItems: ++this.state.amountOfItems,
        chosenItems: this.state.chosenItems.concat({code, title, price, count: 1}),
      })
    }

    this.setState({
      ...this.state,
      sum: this.state.chosenItems.reduce((total, item) => total + (item.price * item.count), 0),
    })
 
  }
  /**
   * Удаление товаров из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      chosenItems: this.state.chosenItems.filter(item =>  item.code !== code),
    });
    this.setState({
      ...this.state,
      amountOfItems: --this.state.amountOfItems,
      sum: this.state.chosenItems.reduce((total, item) => total + (item.price * item.count), 0),
    });
  }
}

export default Store;
