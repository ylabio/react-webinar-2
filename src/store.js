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
   * @param code
   */

  addToCart(code) {
      this.state.items.map(item => {
        if (item.code === code) {
          if (!this.state.cart.find(el => el.code == code)) {
            this.setState({
              ...this.state,
              cart: this.state.cart.concat([{...item, quantity: 1}])
            })
            console.log('this.state after')
            console.log(this.state)
          } else {
            this.setState({
              ...this.state,
              cart: this.state.cart.map(item => {
                if(item.code === code){
                  return {
                    ...item,
                    quantity: item.quantity + 1
                  }
                }
                return item;
            })
          })
        }
      }
    })
    this.calculateCartInfo()
  }


  /**
   * Удаление товаров из корзины
   * @param code
   */
  
  removeFromCart(code) {
      this.state.cart.map(item => {
        if (item.code === code) {
            this.setState({
              ...this.state,
              cart: this.state.cart.filter(item => item.code !== code)
            })
        }
      })
      this.calculateCartInfo()
    }

    calculateCartInfo() {
      let sum = 0
      this.state.cart.map(item => {
              sum = sum + (item.quantity * item.price)
            })
      this.setState({
        ...this.state,
        cartInfo: {
          itemsCount: this.state.cart.length,
          cartSum: sum
        }
      })
    }



}

export default Store;
