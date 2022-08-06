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
   * Добавление товара в корзину
   */
  addItemInCart(code) {
      if (this.state.productCart.find((item) => item.code === code)) {
          this.setState({
              ...this.state,
              productCart: this.state.productCart.map((item) => {
                  if (item.code === code) {
                      return {
                          code,
                          title: item.title,
                          price: item.price,
                          amount: item.amount + 1,
                      }
                  }
                  return item;
              }),
          });
      } else {
          const chosenItem = this.state.items.find(item => item.code === code);

          this.setState({
              ...this.state,
              productCart:  this.state.productCart.concat({
                  code,
                  title: chosenItem.title,
                  price: chosenItem.price,
                  amount: 1})
          });
      };
  }
    /**
     * Удаление товара из корзины
     */
    deleteFromCart(code) {
        this.setState({
            ...this.state,
            productCart: this.state.productCart.filter((item) => item.code !== code),
        });
    }
}

export default Store;
