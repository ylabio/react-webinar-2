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
  createItem({code, title = 'Новая запись', index = 0, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, index, selected})
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
        if (item.code === code) {
          item.selected = true;
          item.index += 1
        } else {
          item.selected = false
        }
        return item;
      })
    });
  }

  highlighted(code) {
    code = String(code);
    if (code.slice(-2) === '12' || code.slice(-2) === '13' || code.slice(-2) === '14') {
      return `| Выделялось ${code} раз`;
    } else if (code.slice(-1) === '2' || code.slice(-1) === '3' || code.slice(-1) === '4') {
      return `| Выделялось ${code} раза`;
    } else {
      return `| Выделялось ${code} раз`;
    }
  }

}

export default Store;
