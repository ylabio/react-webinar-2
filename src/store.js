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
  createItem({code, title = 'Новая запись', selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, selected})
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
    const selectedItems = this.state.items.filter((item) => item.selected)
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        const ItemSelected = selectedItems.length != 0 && (selectedItems.includes(item) || item.code === code)
        const ItemNotSelected = item.code === code && selectedItems.length == 0
        if (ItemSelected) {
          item.selected = !item.selected
          item.selectedCount = item.selectedCount == null ? 1 : (!item.selected ? item.selectedCount : item.selectedCount + 1)
        } 
        if (ItemNotSelected) {
          item.selected = !item.selected
          item.selectedCount = item.selectedCount == null ? 1 : item.selectedCount + 1
        }
        return item
      })
    })
  }
}

export default Store;
