import item from "./components/item";

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
   * @param code
   */
   addToCart(code) {
    const hasInCart = this.state.cart.find(item => item.code === code);
    if (!hasInCart) {
      const item = this.state.items.find(item => item.code === code);
      const newItem = {...item, selectedTimes: 1 };
      this.state.totals.quantity = this.state.totals.quantity + 1;
      this.state.totals.sum = this.state.totals.sum + item.price;
      return this.setState({
          ...this.state,
          cart: [...this.state.cart, newItem],
          totalAmount: this.state.totalAmount + item.price,
        })
    } 
    console.log(hasInCart)
    this.setState({
      ...this.state,
      cart: this.state.cart.map(item => {
        if (item.code === code){
          return {
            ...item,
            selectedTimes: item.selectedTimes + 1
          }
        }
        return item;
      }),
      totalAmount: this.state.totalAmount + hasInCart.price,
    })
   }

  /**
   * Удаление записи по её коду
   * @param code
   */
   removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
    console.log(this.state.cart)
  }

  /**
   * Открыть модальное окно
   * @param code
   */
  openModal() {
    this.setState({
      ...this.state,
      isModalOpen: true,
    })
  }

  /**
   * Закрыть модальное окно
   * @param code
   */
  closeModal() {
    this.setState({
      ...this.state,
      isModalOpen: false,
    })
  }
}

export default Store;
