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
    const itemInCart = this.state.cart.find(item => item.code === code);
    if (!itemInCart) {
      const itemInStore = this.state.items.find(item => item.code === code);
      const newItem = {...itemInStore, selectedTimes: 1 };
      return this.setState({
          ...this.state,
          cart: [...this.state.cart, newItem],
          totals: { quantity: this.state.totals.quantity + 1, sum: this.state.totals.sum + newItem.price },
          totalAmount: this.state.totalAmount + newItem.price,
        })
    } 
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
      totals: { quantity: this.state.totals.quantity, sum: this.state.totals.sum + itemInCart.price },
      totalAmount: this.state.totalAmount + itemInCart.price,
    })
   }

  /**
   * Удаление записи по её коду
   * @param code
   */
   removeFromCart(code) {
    const itemIndex = this.state.cart.findIndex(item => item.code === code);
    const deltaPrice = this.state.cart[itemIndex].price;
    const deltaSum = this.state.cart[itemIndex].selectedTimes * deltaPrice;
    this.state.cart.splice(itemIndex, 1);
    const newCart = this.state.cart;
    this.setState({
      ...this.state,
      cart: newCart,
      totals: { quantity: this.state.totals.quantity - 1, sum: this.state.totals.sum - deltaSum},
      totalAmount: this.state.totalAmount - deltaSum,
    });
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
