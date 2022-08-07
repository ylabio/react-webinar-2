import {getTotalAmount, getTotalPrice} from "utils";

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
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }


  /**
   * 
   * Добавление товара в корзину 
   */
  addCartItem(item) {
    const isInCart = this.state.cart.items.some(el => el.code === item.code);
    if (isInCart) {
        this.setState({
            ...this.state,
            cart: {
                ...this.state.cart,
                items: this.state.cart.items.map(el => {
                    if (el.code === item.code) {
                        return {...el, quantity: ++el.quantity};
                    } else {
                        return el;
                    }
                }),
            }
        });
        this.setCart();
        } else {
            this.setState({
                ...this.state,
                cart: {
                    items: [...this.state.cart.items, {...item, quantity: 1}],
                }
            });
            this.setCart();
          }
    }

    /**
     * Удаление записи из корзины по её коду
     * @param code
     */
    deleteCartItem(code) {
        this.setState({
            ...this.state,
            cart: {
                items: this.state.cart.items.filter(el=> el.code !== code),
            }
        });
        this.setCart();
    }

    /**
     * Вычисление корзины
     *
     */
    setCart() {
      const getTotalPrice = (arr) => arr.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const getTotalQuantity = (arr) => arr.reduce((sum, item) => sum + item.quantity, 0);
        this.setState({
            ...this.state,
            cart: {
                ...this.state.cart,
                totalQuantity: getTotalQuantity(this.state.cart.items),
                totalPrice: getTotalPrice(this.state.cart.items),
            }
        });
    }

}

export default Store;
