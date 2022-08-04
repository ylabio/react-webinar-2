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
   * Добавление в корзину
   */
  addInCart(code) {
    const cb = (el) => el.code === code
    const newCart = [...this.state.cart]
    if (newCart.find(cb)) {
      newCart[newCart.findIndex(cb)].count++ 
    } else {
      newCart.push({ // Не мутация изначального состояния
        ...this.state.items.find(cb), 
        count: 1
      })
      newCart.sort((a, b) => a.code - b.code) // Чтобы выглядело красиво и по порядку
                                              // Ещё раз, это не мутация изначального состояния, реакту хорошо
    }

    this.setState({
      ...this.state,
      cart: newCart
    })
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(el => el.code !== code)
    });
  }



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
