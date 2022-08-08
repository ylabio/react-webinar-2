import item from "./components/item";

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
  createItem({code, title = 'Новый товар', price = 999}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price})
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
   * Создание записи корзины
   */
  createCartItem(code) {
    
    if(this.state.cart.items.find(item => item.code === code))
    {
      this.setState({
        ...this.state,
        cart: {...this.state.cart, 
          items: this.state.cart.items.map(item => {
            if(item.code === code){
              return {
                ...item,
                count: item.count + 1 || 1
              }
            }
            return item;
          }),
          sum: this.state.cart.sum + this.state.cart.items.find(item => item.code === code).price
        }
      });
      return
    }
    this.setState({
      ...this.state,
      cart: {...this.state.cart, 
        items: this.state.cart.items.concat({...this.state.items.find((item) => code === item.code), number: this.state.cart.items.length + 1, count: 1}),
        count: (this.state.cart.count + 1) || 1,
        sum: (this.state.cart.sum + this.state.items.find((item) => code === item.code).price) || this.state.items.find((item) => code === item.code).price
      }
    });
  }
  /**
   * Удаление записи корзины по её коду
   * @param code
   */
   deleteCartItem(code) {
    let number = 1;
    this.setState({
      ...this.state,
      cart: {...this.state.cart, 
        items: this.state.cart.items
        .filter(item => item.code !== code)
        .map((item) => {return {...item, number: number++}}),
        count: this.state.cart.count - 1,
        sum: this.state.cart.sum - this.state.cart.items.find(item => item.code === code).price * this.state.cart.items.find(item => item.code === code).count 
      }
    });
  }
  /**
   * Получение сумарной ценый элементов корзины
   */
  getCartSum()
  {
    return this.state.cart.sum;
  }
  /**
   * Получение количества уникальных элементов корзины 
   */
  getCartCount()
  {
    return this.state.cart.count;
  }
}

export default Store;
