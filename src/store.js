// импортирую уже готовый счетчик для подсчета "выделений".
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
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }

  /**
   * Создание записи
   */
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  // Функция выделения сейчас без надобности
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.map(item => {
  //       if (item.code === code) {
  //         return {
  //           ...item,
  // selected: !item.selected,
  // Р
  // count: item.selected ? item.count : item.count + 1 || 1
  //   }
  // }

  //         return item.selected ? { ...item, selected: false } : item;
  //       })
  //     });
  //   }

  addItem(code) {



    (this.state.basket.length >= 1 && this.state.basket.some(el => el.code === code)) ? this.setState({
      ...this.state, basket: this.state.basket.map((el) => {
        if (code === el.code) {

          // return { ...el, amount: el.amount ? ++el.amount : el.amount = 2 }
          return { ...el, amount: el.amount + 1 || 2 }
        }
        return { ...el }
      })
    }) : this.setState({ ...this.state, basket: this.state.basket.concat(this.state.items.find(el => el.code === code)) })


  }
}


export default Store;
