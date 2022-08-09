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
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1
          }
        }
        return item.selected ? {...item, selected: false} : item;
      })
    });
  }

  /**
   * Удаления товара с корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      itemsModal: this.state.itemsModal.filter(item => item.code !== code)
    });
  }
  /**
   * Добавление товара в корзину
   * @param item
   */
  addToModal(item) {
    const itemIsInModal = this.state.itemsModal.some(
        (el) => el.code === item.code
    );

    if (!itemIsInModal) {
      this.setState({
        ...this.state,
        itemsModal: [...this.state.itemsModal, { ...item, amount: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        itemsModal: this.state.itemsModal.map((product) => {
          if (product.code === item.code) {
            return { ...product, amount: ++product.amount };
          } else {
            return product;
          }
        }),
      });
    }
  }

}



export default Store;
