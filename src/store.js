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
  createItem({code, title = 'Новая запись',clicks=0, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code,clicks, title, selected})
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
    deleteItem(code,e) {
      e.stopPropagation();
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
        if ((item.code === code)&&(item.selected===true)){
          item.selected=false;
        }
        else if(((item.code === code)&&(item.selected===false))||((item.code === code)&&(item.selected===undefined))){
          item.selected = true;
          item.clicks++;
         const wordSetter=()=>{
          let str=item.clicks.toString();
          let strLetter=str[str.length-1];
          if((strLetter==2||strLetter==3||strLetter==4)&&((str[str.length-2]===undefined)||(str[str.length-2]!=1))){
            item.word='раза';
          }
          else{
            item.word='раз';
          }
          }

          wordSetter();
        }
        else if((item.code !== code)){
          item.selected=false;
        }
        return item;
      })
    });
  }
}

export default Store;
