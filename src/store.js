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
   * Создание записи
   */
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1
          }
        }
        return item.selected ? {...item, selected: false} : item;
      })
    });
  }
  onDeleteFromBasket(code){
    const item = this.getState().basket.find(item => item.code === code);
    const amount = this.getState().basket.amount - 1;
    const price = this.getState().basket.price - item.price * item.amount;

    this.setState({
      ...this.state,
      basket: {items: this.state.basket.items.filter(item => item.code !== code), amount, price}
    });
  }
  onAddToBasket(code) {

    const item = this.getState().items.find(item => item.code === code);
    const items = this.getState().basket.items.map(item => {
      if (item.code === code){
        return {...item, amount: item.amount + 1};
      } return item;
    });
    const index = this.getState().basket.items.findIndex(item => item.code === code);
    if (index === -1) {
      items.push({...item, amount: 1})
    }
    let price = 0;
    for (const item of items) {
      price += item.price * item.amount;
    }
    let amount = items.length;

    this.setState({
      ...this.state,
      basket: {
        items,
        amount,
        price
      }
    })
  }
}

export default Store;
