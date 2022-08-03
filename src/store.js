class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listners = [];
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
    for (const lister of this.listners) {
      lister();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Создание записи
   */
  createItem({code, title = 'Новая запись', amount = 0, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, amount, selected})
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
          if (!item.selected){
            item.amount += 1;
          }
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      })
    });
  }

  declinationItem(amount) {
    amount = String(amount);
      if (amount.slice(-2) === '12' || amount.slice(-2) === '13' || amount.slice(-2) === '14'){
          return 'раз';
      } else if (amount.slice(-1) === '2' || amount.slice(-1) === '3' || amount.slice(-1) === '4'){
          return 'раза';
      } else {
          return 'раз';
      }
  }
}
export default Store;
