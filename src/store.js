// import item from "./components/itemOfStore";

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
  // Добавление выбранных итемов в корзину
  addItemInBasket({code, title, price}) {
    
    const {totalOfBasket, items} = this.getState().basket;
    const seachObj = items.find((item) => item.code === code);
    
    
    if (typeof(seachObj) === 'undefined') {
      const newBasket = {totalOfBasket: totalOfBasket + price, items: [...items,{code, title, price, count: 1}]}
        this.setState({
          ...this.state,
          basket:newBasket,
        }
      )
    }
      else{
        const seachObj = items.find((item) => item.code === code);
        seachObj.count += 1
        const newBasket = {totalOfBasket: totalOfBasket + price, items: [...items]}
        this.setState({
          ...this.state,
          basket:newBasket,
        }
      )
    }
  }

  deleteItemInBasket ({code, title, price, count}) {
    const {totalOfBasket, items} = this.getState().basket;
    const seachObj = items.find((item) => item.code === code);
    const modifiedItems = items.filter((item) => item.code !== code);
    console.log(modifiedItems)
    this.setState({
      ...this.state,
      basket: {
        totalOfBasket:totalOfBasket - (price*count),
        items: modifiedItems
      }
    })
  }

  openModal (modal, setModal) {
    if (modal === true) {
      modal = false;
      setModal(modal)
    }
    else{
      modal = true;
      setModal(modal);
    }
  }
}

export default Store;