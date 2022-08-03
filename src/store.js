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
  createItem({code, title = 'Новая запись', selected = false, cntSelect = 0}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, selected, cntSelect})
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
        let selectedItem = item.code;
        if (item.code === code){
          
          item.selected = !item.selected;
          this.state.items.map(item => {
            if (selectedItem != item.code){
              item.selected = false;
            }
          })

          this.state.items.map(item => {
            if (item.selected == true){
              item.cntSelect += 1;
              item.selectedCount = item.cntSelect + " раз"
            }
          })

          this.state.items.map(item => {
            switch(item.cntSelect){
              case 2: item.selectedCount = item.cntSelect + " раза";
              case 3: item.selectedCount = item.cntSelect + " раза";
              case 4: item.selectedCount = item.cntSelect + " раза";
              case 22: item.selectedCount = item.cntSelect + " раза";
              case 23: item.selectedCount = item.cntSelect + " раза";
              case 24: item.selectedCount = item.cntSelect + " раза";
              case 32: item.selectedCount = item.cntSelect + " раза";
              case 33: item.selectedCount = item.cntSelect + " раза";
              case 34: item.selectedCount = item.cntSelect + " раза";
              case 42: item.selectedCount = item.cntSelect + " раза";
              case 43: item.selectedCount = item.cntSelect + " раза";
              case 44: item.selectedCount = item.cntSelect + " раза";
              case 52: item.selectedCount = item.cntSelect + " раза";
              case 53: item.selectedCount = item.cntSelect + " раза";
              case 54: item.selectedCount = item.cntSelect + " раза";
            }
          })
        }
        return item;
      })
    });
  }
}

export default Store;
