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
      this.listners = this.listners.filter((item) => item !== callback);
    };
  }

  /**
   * Создание записи
   */
  createItem({ code, title = 'Новая запись', count = 0, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, selected, count }),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        let indexCode = -1;
        for (let i = 0; i < this.state.items.length; i++) {
          if (this.state.items[i].selected == true) {
            indexCode = i + 1;
          }
        }
        console.log('first', indexCode);
        if (indexCode == -1) {
          if (item.code === code) {
            item.selected = !item.selected;
          }
        } else if (indexCode !== -1) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
  unselectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
