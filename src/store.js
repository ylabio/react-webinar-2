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
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  addToBasket(code) {
    const items = this.state.basket.items;
    const itemsCodes = this.state.basket.itemsCodes;
    const itemsAmount = this.state.basket.itemsAmount + 1;
    let itemsPrice = this.state.basket.itemsPrice;

    if (itemsCodes.includes(code)) {
      items.find((item) => {
        if (item.code === code) {
          itemsPrice += item.price;
          item.amount++;
          return;
        }
      });
    } else {
      const item = { ...this.state.items.find((item) => item.code === code) };
      itemsPrice += item.price;
      itemsCodes.push(code);
      item.amount = 1;
      items.push(item);
    }

    this.setState({
      ...this.state,
      basket: {
        itemsPrice,
        itemsAmount,
        items,
        itemsCodes,
      },
    });
  }

  deleteFromBasket(code) {
    const basket = this.state.basket;
    const itemShouldDelete = basket.items.find((item) => item.code === code);

    this.setState({
      ...this.state,
      basket: {
        itemsAmount: basket.itemsAmount - itemShouldDelete.amount,
        itemsPrice:
          basket.itemsPrice - itemShouldDelete.price * itemShouldDelete.amount,
        itemsCodes: basket.itemsCodes.filter((item) => item !== code),
        items: basket.items.filter((item) => item.code !== code),
      },
    });
  }

  // /**
  //  * Создание записи
  //  */
  // createItem({code, title = 'Новый товар', price = 999, selected = false}) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.concat({code, title, price, selected})
  //   });
  // }

  // /**
  //  * Удаление записи по её коду
  //  * @param code
  //  */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.filter(item => item.code !== code)
  //   });
  // }

  // /**
  //  * Выделение записи по её коду
  //  * @param code
  //  */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.map(item => {
  //       if (item.code === code){
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1
  //         }
  //       }
  //       return item.selected ? {...item, selected: false} : item;
  //     })
  //   });
  // }
}

export default Store;
