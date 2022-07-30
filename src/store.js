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
  createItem({code, title = 'Новая запись', selected = false, timesSelected = 0}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, selected, timesSelected }),
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
          
          if (!item.selected) {
            item.timesSelected = item.timesSelected + 1;

            if (item.timesSelected >= 2 && item.timesSelected < 5) {
              item.title = item.title.split('|')[0] + ` | Выделялось ${item.timesSelected} раза`;
            } else {
              item.title = item.title.split('|')[0] + ` | Выделялось ${item.timesSelected} раз`;
            }
          }

          item.selected = !item.selected;

        } else {
          item.selected = false;
        }

        return item;
      })
    });
  }
}

export default Store;
