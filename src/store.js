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
   * Добавлен уникального товара в карзину
   */
  createItem({ code }) {

    const product = (this.getState().items).filter(item => item.code == code)

    {
      !!((this.getState().itemsInCart).filter(item => item.code == code))[0] ?
        this.setState({

          //
          ...this.state,
          itemsInCart: this.state.itemsInCart.map(item => {
            if (item.code === code) {
              return {
                ...item,
                count: item.count + 1,
              }
            }
            return item
          })
        })
        :
        this.setState({
          ...this.state,
          itemsInCart: this.state.itemsInCart.concat({ ...product[0], count: 1 })
        })
    }


  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      itemsInCart: this.state.itemsInCart.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      itemsInCart: this.state.items.map(item => {
        if (item.code === code) {
          return {
            ...item,
            count: item.count ? item.count + 1 : 1,
          }
        }
        return console.log('==> onSelectItems', code) // item.selected ? {...item, selected: false} : item;

      })
    });
  }
}

export default Store;
