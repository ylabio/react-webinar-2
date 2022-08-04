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
   * Добавление товара в корзину
   * @param code
   */
  addItemToBasket(code) {
    if (!this.state.basket) // если еще ничего нет
      this.state.basket = [];

    if (this.state.basket.find((item) => item.code === code)) { // такой товар уже добавляли
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              count: ++item.count,
            }
          }
          return item;
        }),
      });
    } else { // добавляем новый товар из общего списка
      this.setState({
        ...this.state,
        basket: this.state.basket.concat({
          ...this.state.items.find(item => item.code === code),
          count: 1
        })
      });
    };
  }

  /**
  * Удаление товара из корзины
  * @param code
  */
  removeItemFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
  }

  /**
   * Узнать сумму всех товаров в корзине
   * @return number
   */
  getTotalPrice() {
    if (!this.state.basket || !this.state.basket.length)
      return 0;
    
    let totalPrice = 0;
    this.state.basket.forEach(item => {
      totalPrice += item.price * item.count;
    });
    
    return totalPrice;
  }

  /**
   * Узнать количество товаров в корзине
   * @param skipCount если true, то считаем наименования, без учета штук
   * @return number
   */
  getTotalGoods(skipCount = false) {
    if (!this.state.basket || !this.state.basket.length)
      return 0;

    if (skipCount)
      return this.state.basket.length;
    
    let totalGoods = 0;
    this.state.basket.forEach(item => {
      totalGoods += item.count;
    });
    
    return totalGoods;
  }

}

export default Store;