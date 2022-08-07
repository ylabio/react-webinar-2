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
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
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

  addItemInBasket({code, title, price}) {
    let {totalOfBasket, itemsOfBasket} = this.getState().basket;
    // const items = this.getState().items;
    // const seacrhIndex = itemsOfBasket.findIndex((item) => item.code === code)
    const seachObj = itemsOfBasket.find((item) => item.code === code);
   
    if (typeof(seachObj) === 'undefined') {
      const newBasket = {totalOfBasket: totalOfBasket + price, itemsOfBasket: [...itemsOfBasket, {code, title, price, count: 1}]}
        this.setState({
          ...this.state,
          // basket: {
          //   totalOfBasket: totalOfBasket += price,
          //   itemsOfBasket:[...itemsOfBasket,{code, title, price, count: 1}]
          // },
          basket:newBasket,
        }
      )
    }
    else {
      
     const newItemsOfBasket = itemsOfBasket.filter((item) => item.code !== code);
     seachObj.count += 1;
     const newBasket = {totalOfBasket: totalOfBasket + price, itemsOfBasket: [...newItemsOfBasket, {...seachObj}]}
      this.setState({
        ...this.state,
        basket: newBasket,
      })
    }
    console.log(this.state)
  }

  /**
   * Выделение записи по её коду
   * @param code
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
