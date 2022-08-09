import controls from "./components/controls";

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
   * Добавление товара в корзину по её коду
   * @param code
   * @param item
   */

   addItem(code, item) {
    const already = this.state.basketItems.find((item) => item.code === code)
    if (already) {
      this.setState({
        ...this.state,
        basketItems: this.state.basketItems.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              countOnBasket: item.countOnBasket + 1,
            }
          } else {
            return item
          }
        }),
        totalPrice: already.price + this.state.totalPrice
      })
    } else {
      this.setState({
        ...this.state,
        basketItems: this.state.basketItems.concat({ ...item, countOnBasket: 1 }),
        totalPrice: item.price + this.state.totalPrice
      })
    }
   }
  /**
   * Удаление товара из корзины по её коду
   * @param code
   */

  deleteItem(removeItem) {
    this.setState({
      ...this.state,
      basketItems: this.state.basketItems.filter(item => item.code !== removeItem.code),
      totalPrice: this.state.totalPrice - (removeItem.price * removeItem.countOnBasket)
    });
  }

  /*  Открытие модалки  */ 

  openModal(viewModal, setViewModal) {
    setViewModal(!viewModal)
  }

  /*  Закрытие модалки  */

  closeModal(viewModal, setViewModal) {
    setViewModal(!viewModal)
  }
}

export default Store;
