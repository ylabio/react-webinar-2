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

  _getTotalPrice() {
    return this.state.cart.reduce((acc, cur) => acc + cur.price*cur.amount, 0)
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
   * @param code
   */
   addToCart(code) {
    // const items = this.state.items - для альтернативного варианта
    const index = this.state.cart.findIndex(el => el.code === code)

    if (index !== -1) {
      let copyCart = this.state.cart.map((el, idx) => idx === index 
      ? {...this.state.cart[idx], "amount": this.state.cart[idx]["amount"] + 1}
      : el)

      this.setState({
        ...this.state,
        cart: copyCart
      });
    } else {
        this.setState({
        ...this.state,
        cart: this.state.cart.concat({...this.state.items.find(item => item.code === code), amount: 1 })
      });
      // Альтернативный вариант - получил данные не перебирая массив, но в реальности код товара - будет уникальный идентификатор, да и в целом полагаться на такой способ не надежно. Как вариант еще передавать цену и название вместе с кодом товара через пропсы. Или хранить весь список товаров в объекте с ключами id товара (как я сделал в предидущей реализации state items)
      // this.setState({
      //   ...this.state,
      //   cart: this.state.cart.concat({
      //     code, 
      //     title: items[code - 1]["title"], 
      //     price: items[code - 1]["price"], 
      //     amount: 1
      //   })
      // });
    } 
    this.setState({
      ...this.state,
      totalPrice: this._getTotalPrice()
    });
  }

   /**
   * Удаление товара из корзины
   * @param code
   */
    removeFromCart(code) {
      this.setState({
        ...this.state,
        cart: this.state.cart.filter(item => item.code !== code)
      });
      this.setState({
        ...this.state,
        totalPrice: this._getTotalPrice()
      });
    }

   /**
   * Удаление записи по её коду
   * @param code
   */
    setOpenCart(isOpenCart) {
      this.setState({
        ...this.state, isOpenCart
      });
    }
}

export default Store;
