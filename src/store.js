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
     * Удаление записи по её коду
     * @param code
     */
  deleteItem(code) {
    this.setState({
      ...this.state,
      card: this.state.card.filter(item => item.code !== code)
    });
  }

  /**
   * Добавление товара в корзину по его коду
   * @param code
   */
  addInCard(code) {
    let title = this.state.items[code-1].title;
    let price = this.state.items[code-1].price;
    let count = 1;
    let IncludeFilter = this.state.card.filter(item => item.code === code)
    if(IncludeFilter.length === 0) {
      this.setState({
        ...this.state,
        card: this.state.card.concat({code, title, price, count})
      });
    }
    else {
      this.setState({
        ...this.state,
        card: this.state.card.map(card => {
          if (card.code === code ) {
            return {
              ...card,
              count: card.count += 1
            }
          }  
          return card;  
        })
      });
    }
  }
}

export default Store;
