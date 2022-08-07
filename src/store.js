class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState
    // Слушатели изменений state
    this.listeners = []
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener()
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listeners.push(callback)
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== callback)
    }
  }

  /**
   * Добавление в корзину
   */
  addInBasket(code) {
    const foundIndex = this.state.items.findIndex((item) => item.code === code)
    if (this.state.basket.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) =>
          item.code === code
            ? {
                ...item,
                quantity: item.quantity + 1,
                currentPrice: item.currentPrice + item.price
              }
            : item
        )
      })
      return
    }
    this.setState({
      ...this.state,
      basket: [
        ...this.state.basket,
        {
          ...this.state.items.find((item) => item.code === code),
          quantity: 1,
          currentPrice: this.state.items[foundIndex].price
        }
      ]
    })
  }

  /**
   * Удаление товара из корзины по её коду
   * @param code
   */
  deleteFromBasket(code) {
    if (this.state.basket.find((item) => item.code === code).quantity > 1) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) =>
          item.code === code
            ? {
                ...item,
                quantity: item.quantity - 1,
                currentPrice: item.currentPrice - item.price
              }
            : item
        )
      })
      return
    }
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== code)
    })
  }
}

export default Store
