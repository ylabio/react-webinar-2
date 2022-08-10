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
   * Создание записи
   */
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
    })
  }
  /**
   * Добавление товара в корзину
   */
  addItem(code) {
    const coincidence = this.state.basket.find((basketItem) => basketItem.code === code)

    {
      coincidence
        ? this.setState({
            ...this.state,
            basket: [
              ...this.state.basket.map((basketItem) => {
                if (coincidence.code === basketItem.code) {
                  basketItem.count++
                }
                return basketItem
              }),
            ],
          })
        : this.setState({
            ...this.state,
            basket: this.state.basket.concat({
              ...this.state.items.find((item) => item.code === code),
              count: 1,
            }),
          })
    }
    this.setState({
      ...this.state,
      sum: Number(this.state.basket.reduce((acc, num) => acc + num.price * (num.count || 1), 0)),
      quantity: this.state.basket.length,
    })
  }
  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(itemArr) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== itemArr.code),
    })
    this.setState({
      ...this.state,
      sum: Number(this.state.basket.reduce((acc, num) => acc + num.price * (num.count || 1), 0)),
      quantity: this.state.basket.length,
    })
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          }
        }
        return item.selected ? { ...item, selected: false } : item
      }),
    })
  }
}

export default Store
