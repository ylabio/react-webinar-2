class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeeners = [];
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
    for (const listenener of this.listeeners) {
      listenener();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listeeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeeners = this.listeeners.filter(item => item !== callback);
    }
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  pushItemToCart(code) {
    const cart = [...this.state.cart];
    let newCart = [];
    if(cart.find((item) => item.code === code)){
      newCart = cart.map((item) => {
        if(item.code === code){
          return {...item , count: ++item.count}
        } return item;
        })
    }else{
        cart.push({...this.state.items.find((item) => item.code === code) , count: 1})
        newCart = [...cart];
    }
    this.setState({...this.state , cart: newCart})
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
  }
}

export default Store;