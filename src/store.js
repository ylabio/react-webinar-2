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
   * Добавление в корзину
   */
  addItem(code) {
    const getOneObj = () => {
      this.setState({
        ...this.state,
        newObj: this.state.items.filter(item => item.code === code)
      })
      this.state.newObj[0].total = 1
      return this.state.newObj
    }

    if(!this.state.cart.length){
      this.setState({
        ...this.state,
        cart: this.state.cart.concat(getOneObj()),
      });
    } else {
      if(this.state.cart.some((item) => item.code === code)){
        this.setState ( {
          ...this.state,
          cart: this.state.cart.map( (item) => {
            if (item.code === code){
              return {
                ...item,
                total: item.total + 1
              }
            } 
            return item
          }),
        });
      } else {
        this.setState({
          ...this.state,
          cart: this.state.cart.concat(getOneObj()),
        });
        
      }
    };
    this.totalPriceChange ()
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
    this.totalPriceChange()
  }

  totalPriceChange () {
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce((sum, el) => sum + el.price * el.total, 0)
    })
  }

}

export default Store;
