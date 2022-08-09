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
    if (this.orderList.length === 0){
      this.orderList = [{...item, amount}]
    } else {
      for (let i = 0 ; i < this.orderList.length; i++){
        if(this.orderList[i].code === item.code){
          const itemWithCahngedAmount = this.orderList[i] //учет иммутабельности при смене количества элементов
          itemWithCahngedAmount.amount = amount;
          this.orderList[i] = itemWithCahngedAmount;
          break
        } else if(i === this.orderList.length - 1){
          this.orderList = [...this.orderList, {...item, amount}] //учет иммутабельности при добавление нового товара
        }
      }
    }
  }
}

export default Store;
