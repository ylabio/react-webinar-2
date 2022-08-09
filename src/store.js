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
  * Увеличение уникальных товаров в корзине 
  */
  countUniqueProducts(number) {
    this.setState({
      ...this.state,
      uniqueProducts: this.state.uniqueProducts + number
    })
  }

  /**
  * Увеличение общей суммы товаров в корзине 
  */
  totalPrice() {
    let total = 0;
    this.state.basket.forEach(value => total = total + value.price * value.count)
    this.setState({
      ...this.state,
      total: total
    })
  }

  /**
  * Добавление товара в корзину 
  */
  addToBasket(code) {
    let { title, price } = this.state.items.find(value => value.code === code);
    let count = 1;
    if (!this.state.basket.length) {
      this.setState({
        ...this.state,
        basket: this.state.basket.concat({ code, title, price, count })
      });
      this.countUniqueProducts(1)
      this.totalPrice()
    } else {
      if (this.state.basket.find(value => value.code === code)) {
        this.setState({
          ...this.state,
          basket: this.state.basket.map(value => {
            if (value.code === code) {
              return {
                ...value,
                count: value.count += 1
              }
            }
            return value
          })
        })
        this.totalPrice()
      } else {
        this.countUniqueProducts(1)
        this.setState({
          ...this.state,
          basket: this.state.basket.concat({ code, title, price, count })
        });
        this.totalPrice()
      }
    }
  }

  /**
   * Удаление записи по её коду из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
    this.countUniqueProducts(-1)
    this.totalPrice()
  }




}

export default Store;
