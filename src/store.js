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
   * Переключатель модального окна
   * 
   */
  modalToggle() {
    this.setState({
      ...this.state,
      modalToggle: !this.state.modalToggle 
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItem(code) {
    this.setState({
      ...this.state,
      chosenItems: this.state.items.filter(item => {
        if(item.code === code) {
            return {...item, count: ++item.count}
        }
        return item.count ? item : null
      })
    });
    }
  /**
   * Удаление товаров из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      chosenItems: this.state.chosenItems.filter(item => {
        if(item.code !== code) {
          return item
        } else {
            item.count = 0
            return
        }
      })
    });
  }
}

export default Store;
