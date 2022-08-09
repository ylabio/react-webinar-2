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


  // Добавление в корзину

  addToCart(item) {
    //Переменная, определяющая добавляем мы новый item или увеличиваем счетчик
    let adding = true

    this.setState({
      ...this.state, itemsInCart :
     this.state.itemsInCart.map(i => {
       if (i.code === item.code) {
         adding = false
         return {...i, count: i.count + 1 }
       } else {
         return i
       }
     })
    })

    if (adding) {
      this.setState({
        ...this.state, itemsInCart:
            this.state.itemsInCart.concat({...item, count: 1})
      })
    }
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state, itemsInCart :
          this.state.itemsInCart.filter(i => i.code !== code)

    })
  }


}

export default Store;
