import item from "./components/item";

class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;

    if (!this.state.basket)
      this.state.basket = [];

    if (!this.state.stats)
      this.state.stats = {goods: 0, price: 0};

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

    if (!this.state.basket)
      this.state.basket = [];

    if (!this.state.stats)
      this.state.stats = {goods: 0, price: 0};
    
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
    this.updateBasketStats();
  }

  /**
  * Удаление товара из корзины (целиком наимеование)
  * @param code
  */
  removeItemFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
    this.updateBasketStats();
  }

  /**
   * Обновить количество и стоимость всех товаров в корзине
   */
  updateBasketStats() {
    let price = 0;
    this.state.basket.forEach(item => {
      price += item.price * item.count;
    });

    this.setState({
      ...this.state,
      stats: {
        goods: this.state.basket.length,
        price
      }
    });
  }

}

export default Store;