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
   createItem({code, title = 'Новая запись', title_store = title, count = 0, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, title_store, count, selected})
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
          item.selected = !item.selected; 
          if (item.selected){
            item.count = item.count + 1;
            item.title = item.title_store + ' | Выделялся '+ item.count + ' раз';            
          };   
        } else {
          item.selected = false;
        }
        return item;
      })
    });
  }
    /**
   * Обнуление записей при клике
   *
   */
     resetItem() {
      this.setState({
        ...this.state,
        items: this.state.items.map(item => {
            item.selected = false;         
            return item;
        })
      });
    }
}

export default Store;
