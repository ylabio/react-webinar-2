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
<<<<<<< HEAD
      this.listeners = this.listeners.filter(item => item !== callback);
    }
=======
      this.listners = this.listners.filter((item) => item !== callback);
    };
>>>>>>> master
  }

  /**
   * Создание записи
   */
<<<<<<< HEAD
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
=======
  createItem({
    code,
    title = 'Новая запись',
    selected = false,
    selectCount = 0,
  }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, selected, selectCount}),
>>>>>>> master
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
<<<<<<< HEAD
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
=======
      items: this.state.items.map((item) => {
        if (!item.selected && item.code === code) {
          item.selected = !item.selected;
          item.selectCount++;
        } else {
          item.selected = false;
        }
        return item;
      }),
>>>>>>> master
    });
  }
}

export default Store;
