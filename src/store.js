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

  updateStateField(field, value) {
    this.setState({
      ...this.state,
      [field]: value,
    });
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

  createItem({code, title = 'Новый товар', price = 999, count = 0}) {
    this.updateStateField('items', {code, title, price, selected});
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.updateStateField('items', this.state.items.filter(item => item.code !== code));
    this.dropItemFromBasket(code);
  }

  calculateTotalSumm() {
    this.updateStateField('totalSumm', this.state.basket.reduce((total, item) => {
      return total + (item.selectCount * item.price);
    }, 0));
  }

  addItemToBasket(item) {
    let itemAlreadyInBasket = false;
    let updatedBasket = this.state.basket.map((basketItem) => {
      if (basketItem.code === item.code) {
        itemAlreadyInBasket = true;
        basketItem = {
          ...basketItem,
          selectCount: isNaN(basketItem.selectCount) ? 1 : basketItem.selectCount + 1,
        };
      }

      return basketItem;
    });

    if (!itemAlreadyInBasket) {
      updatedBasket = updatedBasket.concat([{
        ...item,
        selectCount: 1,
      }]);
    }

    this.updateStateField('basket', updatedBasket.sort((a, b) => a.code - b.code));
    this.calculateTotalSumm();
  }

  dropItemFromBasket(code) {
    this.updateStateField('basket', this.state.basket.filter(item => item.code !== code));
    this.calculateTotalSumm();
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
}

export default Store;
