class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
    // Корзина
    this.state.cart = {total: 0, unique: 0, items: {}};
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
    };
  }

  /**
   * Получение записи из товаров (для получения информации по коду товара)
   */
  getItem(code) {
    return this.state.items.find(item => item.code === code);
  }

  /**
   * Получение всех товаров
   */
  getItems() {
    return this.state.items.map(item => {
      return {code: item.code, title: item.title, details: [item.price.toLocaleString("ru") + " ₽"]};
    });
  }

  /**
   * Добавление записи в корзину
   */
  addToCart(code) {
    //нет смысла хранить копии каждого товара в рамках данного приложения
    //хранение копий приводит к лишним операциям при подсчете уникальных товаров в корзине и итоговой суммы
    //const concatArray = this.state.cart.items.concat(code);
    const item = this.getItem(code);
    const newCart = this.state.cart;
    if (this.state.cart.items[code.toString()]) newCart.items[code.toString()].count++;
    else {
      newCart.items[code.toString()] = {item: item, count: 1};
      newCart.unique = Object.keys(newCart.items).length;
    }
    newCart.total += item.price;

    this.setState({...this.state, cart: newCart});
  }

  /**
   * Получение записей из корзины
   */
  getCart() {
    const items = [];
    for (const i in this.state.cart.items) {
      const count = this.state.cart.items[i].count;
      const item = this.state.cart.items[i].item;
      items.push({code: item.code, title: item.title, details: [(item.price * count).toLocaleString("ru") + " ₽", count + " шт"]});
    }
    return {total: this.state.cart.total, items: items};
  }

  /**
   * Получение уникальных товаров и суммы
   */
  getTotal() {
    return {total: this.state.cart.total, unique: this.state.cart.unique};
  }

  /**
   * Удаление записей по её коду из корзины
   * @param code
   */
  deleteFromCart(code) {
    const newCart = {total: 0, unique: 0, items: {}};
    newCart.total = this.state.cart.total - (this.state.cart.items[code.toString()].item.price * this.state.cart.items[code.toString()].count);
    newCart.unique = this.state.cart.unique - 1;

    for (const i in this.state.cart.items) {
      if (this.state.cart.items[i].item.code !== code) {
        newCart.items[i] = this.state.cart.items[i];
      }
    }
    this.setState({...this.state, cart: newCart});
  }
}

export default Store;
