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

  adderToCart() {
    this.setState({
      ...this.state,
      open:true,
      
    });
    
  }

  removeItem(item){
    let  number=item['code']-1;
    let obj=JSON.parse(JSON.stringify(this.state.items));
    
    delete obj[number];
    delete item.inCart;
    delete item.counter;
    obj.push(item);
    
    this.setState({
      ...this.state,
      items:this.state.items
  })
  }

  cartCloser(){
    this.setState({
      ...this.state,
      open:false,
      
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  addToCart(item) {
    const d=this.state.items[item['code']-1];
    if(!d.inCart){
      d.inCart=1
    }
    else{
      d.inCart++;
    }
    const stable=this.state.items;
    const fromStable=stable.splice(item['code']-1,1,d);

    this.setState({
      ...this.state,
      items: stable,
    });
    

  }

}

export default Store;
