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
console.log(item)
    this.setState({
      ...this.state, itemsInCart :
     this.state.itemsInCart.map(i => {
       if (i.code === item.code) {
         adding = false
         console.log("1")
         return {...i, count: i.count + 1 }
       } else {
         return i
       }
     }), totalPrice:
           this.state.totalPrice + item.price
    })

    if (adding) {
      console.log("2")
      this.setState({
        ...this.state, itemsInCart:
            this.state.itemsInCart.concat({...item, count: 1}),
        totalCount: this.state.totalCount + 1, totalPrice: this.state.totalPrice
      })
    }
    console.log("cnt", this.state.totalCount)
    console.log("price", this.state.totalPrice)
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(item) {
    this.setState({
      ...this.state, itemsInCart :
          this.state.itemsInCart.filter(i => i.code !== item.code),
      totalCount: this.state.totalCount - 1, totalPrice: this.state.totalPrice - item.price * item.count
    })
    console.log(this.state.totalCount)
    console.log(this.state.totalPrice)
  }


}

export default Store;
