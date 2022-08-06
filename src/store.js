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
   * Добавление товара в корзину
   */
  addToCart(item) {
    let index = -1
    // если корзина не пустая, возможно, текущий товар был уже добавлен;
    // тогда ищем этот товар по коду и сохраняем его индекс
    if (this.state.cartItems.length > 0) {
      for (let i=0; i<this.state.cartItems.length; i++) {
        if (item.code === this.state.cartItems[i].code) {
          index = i
          break
        }
      }
    }
    if (index === -1) {
      // если товар не был найден в корзине, то добавляем его и устанавливаем счетчик
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems, {...item, amount: 1}]
      });
    } else {
      // если товар уже содержится в корзине, увеличиваем счетчик и возвращаем новый стейт
      this.state.cartItems[index].amount += 1
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems]
      })
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code)
    });
  }

}

export default Store;
