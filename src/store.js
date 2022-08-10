class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    this.listeners = [];
    this.orderList = [];
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

  setOrder(newOrderList){
    this.orderList = newOrderList;
    for (const listener of this.listeners) {
      listener();
    }
  }


  getOrder() {
    return this.orderList;
  }

  showOrder() {
    
      const amount = this.orderList.length;
      const cost = this.orderList.reduce((prev, item) => {
        return prev + item.price * item.amount
      }, 0)
      
      return {cost, amount}
      
  }

  addItem(item, amount) {

    let isAddNewItem = true;

    if (this.orderList.length === 0) {
      isAddNewItem = false;
      this.setOrder([{...item, amount}])
    } else { 
      this.setOrder(this.orderList.map((elem) => {
        if (elem.code === item.code){
          isAddNewItem = false;
          return {...elem, amount};
        } else {
          return {...elem}
        }
      }))
      if(isAddNewItem) {
        this.setOrder([...this.orderList, {...item, amount}])
      }
    }
    console.log(this.orderList)
    }
}

export default Store;
