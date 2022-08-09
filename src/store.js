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
  deleteItem(code) {
    const newItems=this.state.items.map(item => {
      if (item.code === code) {
        return {
          ...item,
          count: item.count-=1
        }
      }
      return item;
    })
    this.setState({
      ...this.state,
      items: newItems,
      basket:newItems.filter(el=>el.count>=1)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    const newItems=this.state.items.map(item => {
      if (item.code === code){
        return {
          ...item,
          count:  item.count + 1
        }
      }
      return item;
    })
    this.setState({
      ...this.state,
      items: newItems,
      basket:newItems.filter(el=>el.count>=1)
    });
  }

}

export default Store;
