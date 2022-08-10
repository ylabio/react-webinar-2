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
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected })
    });
  }

  /**
   * Переключение "флага" модального окна
   */
  modalTogge() {
    this.setState({
      ...this.state,
      isModalActive: !this.state.isModalActive
    })
  }

  /**
   * Удаление товара из корзины по его коду
   * @param code
   */
  removeItemFromBasket(code) {
    let item = this.state.basketItems.find(item => item.code === code);
    this.setState({
      ...this.state,
      basketItems: this.state.basketItems.filter(item => item.code !== code),
      amountOfUniqueGoodsInBasket: --this.state.amountOfUniqueGoodsInBasket,
      totalPriceGoodsInBasket: this.state.totalPriceGoodsInBasket - (item.quantity * item.price)
    });
  }

  /**
   * Добавление товара в корзину по его коду
   * @param code
   */
  addItemToBasket(code) {

    // Находим товар
    let item = this.state.items.find(item => item.code === code);
    // Проверяем наличие товара в корзине(ищем)
    let itemInBasket = this.state.basketItems.find(item => item.code === code);

    // Если товара нет в корзине
    if (itemInBasket === undefined) {
      this.setState({
        ...this.state,
        basketItems:
          this.state.basketItems.concat({ code: item.code, title: item.title, price: item.price, quantity: 1 }),
        amountOfUniqueGoodsInBasket: ++this.state.amountOfUniqueGoodsInBasket,
        totalPriceGoodsInBasket: this.state.totalPriceGoodsInBasket + item.price,
      });
    } // Если товар есть в корзине
    else if (itemInBasket !== undefined) {

      // Находим индекс добавляемого товара в корзине
      let indexItemToBasket = this.state.basketItems.findIndex(item => item.code === code);

      let prevBasketUniqueItems = this.state.basketItems;

      // Увеличиваем количество товара, вновь добавленного в корзину
      prevBasketUniqueItems.splice(indexItemToBasket, 1, {
        code: item.code,
        title: item.title,
        price: item.price,
        quantity: ++prevBasketUniqueItems[indexItemToBasket].quantity
      })
      this.setState({
        ...this.state,
        basketItems: prevBasketUniqueItems,
        totalPriceGoodsInBasket: this.state.totalPriceGoodsInBasket + item.price,
      });
    }
  }
}

export default Store;
