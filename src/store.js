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
   * Добавление товара по коду
   * @param code
   */

  addItemToBasket(item) {
    let exists = false; 
    const newItemInBasket = this.state.basket.product.map((newItem) => {
      if (item.code === newItem.code) {
        // newItem.count += 1;
        exists = true;
        return {...newItem, count: newItem.count + 1}
      }
      return newItem
    })

    !exists ? newItemInBasket.push({...item, count: 1}) : null;

    this.setState({
      ...this.state,
      basket: {
        product: newItemInBasket,
        count: !exists ? this.state.basket.count + 1 : this.state.basket.count,
        price: this.state.basket.price + item.price
      }
    })
  }

  /**
   * Удаление товара по коду
   * @param code
   */

  deleteItemToBasket(item) {
    let temp = 0;
    const newItems = this.state.basket.product.filter(prod => {
      if (prod.code === item.code) {
        temp = item.count
      }
      return prod.code !== item.code
    });

    this.setState({
      ...this.state,
      basket: {
        product: newItems,
        count: this.state.basket.count - 1,
        price: this.state.basket.price - item.price * temp
      }
    })
  }

  handleModal(name) {
    this.setState({
      ...this.state,
      modal: name
    })
  }
}

export default Store;
