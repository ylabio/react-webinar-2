import plural from 'plural-ru'

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
    createItem({ code, title = 'Новая запись', selected = false, selectedTimes = 0 }) {
    this.setState({
      ...this.state,
        items: this.state.items.concat({ code, title, selected, selectedTimes})
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
   * @param code - это id обрабатываемого элемента
   **/
    selectItem(code) {
      const items = this.state.items.map(item => {
          if (item.code === code) {
              item.selected = !item.selected;
      
              if (item.selected) {
                  item.selectedTimes = ++item.selectedTimes || 1;
                  item.computedTitle = `${item.title} | Выделялся ${plural(item.selectedTimes,'%d раз','%d раза')}`
              }

          }
          else  item.selected = false;
      
          return item;
      });


      this.setState({
          ...this.state,
          items,
      });
  }
}

export default Store;
