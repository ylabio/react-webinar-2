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
    };
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
   * Добавление записи в корзину
   * @param code
   */

  addItemToCart(code) {
    const itemToAdd = this.state.items.find(item => item.code === code); // находим элемент для добавления
    const itemAlreadyInTheCart = this.state.shoppingCart.find(
      item => item.code === code
    ); // есть ли уже такой в корзине?

    if (itemAlreadyInTheCart) {
      // если есть, то увеличиваем количество
      const index = this.state.shoppingCart.indexOf(itemAlreadyInTheCart);
      const amountNew = this.state.shoppingCart[index].amount + 1;
      const itemCopy = {...this.state.shoppingCart[index], amount: amountNew};

      this.setState({
        ...this.state,
        shoppingCart: this.state.shoppingCart.map(item => {
          if (item.code === itemCopy.code) {
            return itemCopy;
          } else {
            return item;
          }
        })
      });
    } else {
      // если нет, то добавляем поле amount со значением 1
      this.setState({
        ...this.state,
        shoppingCart: [...this.state.shoppingCart, {...itemToAdd, amount: 1}]
      });
    }
  }

  /**
   * Возвращение количества уникальных товаров в корзине
   */
  getNumberOfUniqueItemsInCart() {
    return this.state.shoppingCart.length;
  }

  /**
   * Возвращение общей суммы товаров в корзине
   */

  getTotalInCart() {
    return this.state.shoppingCart
      .map(item => item.price * item.amount)
      .reduce((acc, curr) => acc + curr, 0);
  }

  /**
   * Удаление всех записей с кодом из корзины
   * @param code
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      shoppingCart: this.state.shoppingCart.filter(item => item.code !== code)
    });
  }
}

export default Store;
