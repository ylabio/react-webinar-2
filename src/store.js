import item from './components/item';

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
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  /**
   * Создание записи
   */
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code, price, count) {
    if (count > 1) {
      this.setState({
        ...this.state,
        totalPrice: this.state.totalPrice - price,
        totalCount: this.state.totalCount - 1,
        cart: this.state.cart.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count - 1,
            };
          }
          return item;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        totalPrice: this.state.totalPrice - price,
        totalCount: this.state.totalCount - 1,
        cart: this.state.cart.filter((item) => item.code !== code),
      });
    }
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
  addItem(code, title, price) {
    if (this.state.cart.some((item) => item.code === code)) {
      this.setState({
        ...this.state,
        totalPrice: this.state.totalPrice + price,
        totalCount: this.state.totalCount + 1,
        cart: this.state.cart.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
    } else {
      this.state.totalPrice = this.state.totalPrice + price;
      this.state.totalCount = this.state.totalCount + 1;
      this.setState({
        ...this.state,
        cart: this.state.cart.concat({ code, title, price, count: 1 }),
      });
    }
  }
}

export default Store;
