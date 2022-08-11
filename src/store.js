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
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
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
   * Добавление записи в корзину
   * @param code
   */
    addToCart(code) {
      const totalPrice= this.state.cart.totalPrice+this.state.items[code-1].price
      if (this.state.cart.itemsCart.some(n=>n.code==code)){
      this.setState({
        ...this.state,
        cart:{itemsCart: this.state.cart.itemsCart.map(m=>m.code==code? {
          ...m,
          amount:m.amount+1,
          }:m),
        totalPrice,
        totalItems:this.state.cart.totalItems
        }
      })
    }
  else{
    this.setState({
      ...this.state,
      cart:{
      itemsCart:[...this.state.cart.itemsCart,{...this.state.items[code-1],amount:1}],
      totalPrice,
      totalItems:this.state.cart.totalItems+1
    }
    })
  }
}
  /**
   * Удаление записи из корзины
   * @param code
   */
  deleteFromCart(code) {
    let obj=this.state.cart.itemsCart.find(m=>m.code===code)
    let totalPrice= this.state.cart.totalPrice-obj.price*obj.amount
      this.setState({
        ...this.state,
        cart:{ 
        itemsCart:this.state.cart.itemsCart.filter(m=>m.code!=code),
        totalPrice,
        totalItems:this.state.cart.totalItems-1}
      })
}
}

export default Store;
