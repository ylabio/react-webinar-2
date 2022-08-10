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
        this.setState({
          ...this.state ,
          goodsAmount: ++this.state.goodsAmount
        })
    }
    this.setState({
      ...this.state ,
      cart: newCart})
    this.setActualCost();
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      goodsAmount: --this.state.goodsAmount
    });
    this.setActualCost();
  }

  /**
   * Обновление суммы товара в корзине
   */
  setActualCost(){
    let cost = 0;
    this.state.cart.forEach((item) => {
      cost += item.count * item.price;
    })
    this.setState({...this.state , cartCost: cost});
  }
}

export default Store;