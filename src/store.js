class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listners = [];
    this.selectItemForDelete = this.state.items.length;
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
  createItem({ code, title = 'Новая запись', selected = false, count = 0 }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, selected, count })
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
          if (item.selected) item.count++; // Счётчик выделений
        }
        else this.selectItemForDelete == this.state.items.length + 1 ? null : item.selected = ''; // Запрещение снятия выделения при удалении item

        return item;
      })

    });

    this.selectItemForDelete = this.state.items.length
  }
  singledOutTimes(num) {
    let numberToString = String(num)
    let lastIndexArr = numberToString.length - 1;
    let exception = ["2", "3", "4"]

    let exception2 = numberToString.length > 1 ? numberToString.length - 2 : null;

    return exception.includes(numberToString[lastIndexArr]) && (numberToString[exception2] !== "1" || exception2 === null) ?
      `| Выделялось ${num} раза` :
      `| Выделялось ${num} раз`;

  }
}

export default Store;
