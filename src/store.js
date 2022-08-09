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
   * Удаление записи по её коду
   * @param item
   */
  deleteItem(delItem) {
    this.setState({
      ...this.state,
      cartItems: [
        ...this.state.cartItems.filter(item => item.code != delItem.code)
      ],
      items: [
        ...this.state.items.map(item => {
          if (item.code == delItem.code) {
            return {
              ...item,
              addCount: 0
            }
          }
          return item
        }),
      ]
    })
  }
  /**
   * Добавление товара
   * @param item
   */
  addCartItems(addItem) {
    let isAdd = false;
    this.state.cartItems.forEach(item => {
      if (item.code === addItem.code) {
        isAdd = true
      }
    });
    if (!isAdd) {
      this.setState({
        ...this.state,
        cartItems: [
          ...this.state.cartItems,
          addItem
        ]
      })
    }
    else {
      this.setState({
        ...this.state,
        cartItems: [
          ...this.state.cartItems.filter(item => item.code != addItem.code),
          {
            ...addItem,
            addCount: addItem.addCount
          }
        ]
      })
    }
  }

  // Modal show
  showModal() {
    this.setState({
      ...this.state,
      showModal: true
    })
  }

  // Modal hide
  hideModal() {
    this.setState({
      ...this.state,
      showModal: false
    })
  }

}

export default Store;
