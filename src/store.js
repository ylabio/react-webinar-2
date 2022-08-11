import cart from "./components/cart";

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
    this.setState({...this.state,
      items: this.state.items.filter(item => item.code !== code)});
  }

  deleteItemCart(code) {
    const currentPrice = this.state.items
        .filter(item => item.code === code)[0].price;
    const currentAmount = this.state.cart
        .products.filter(item => item.code == code)[0].amount;
    const currentTotal = currentPrice * currentAmount;
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products: this.state.cart.products.filter(item => item.code !== code),
        amount: this.state.cart.amount -= 1,
        total: this.state.cart.total - currentTotal,
      }
    })
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1
          }
        }
        return item.selected ? {...item, selected: false} : item;
      })
    });
  }

  addToCart(code) {
    const isCartEmpty = this.state.cart.amount === 0;
    const currentItem = this.state.items.filter((item) => item.code === code)[0];
    if (isCartEmpty) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: [{code: code, amount: 1}],
          amount: 1,
          total: currentItem.price,
        }
      })
    } else {
      const isProductInCart = Boolean(this.state.cart.products.filter(
          (product) => product.code === code
        ).length);
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: isProductInCart
            ? this.state.cart.products.map((product) => product.code === code
                                            ? {
                                              ...product,
                                              amount: product.amount += 1,
                                            }
                                            : {...product})
            : [...this.state.cart.products, {code, amount: 1}],
          amount: isProductInCart
                  ? this.state.cart.amount
                  : this.state.cart.amount += 1,
          total: this.state.cart.total += currentItem.price,
        }
      })
    }
  }
}

export default Store;
