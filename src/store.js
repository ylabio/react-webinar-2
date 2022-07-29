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
   * @param code
   */
  selectItem(code) {
      // save original state(selected property) of current item
      const { selected: wasSelected } = this.state.items.find(item => item.code === code);
      // reset the selected property of each item
      const items = this.state.items.map(item => ({ ...item, selected: false, }));
      // updated new stated(selected property) of current item
      const selectedItem = items.find(item => item.code === code);
      selectedItem.selected = !wasSelected;

      if (selectedItem.selected) {

          if (!selectedItem.hasOwnProperty('selectedTimes'))
              selectedItem.selectedTimes = 0;

          ++selectedItem.selectedTimes;
          selectedItem.computedTitle = `${selectedItem.title} | Выделялся ${selectedItem.selectedTimes} раз`
      }

      this.setState({
          ...this.state,
          items,
      });
  }
}

export default Store;
