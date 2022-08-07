import plural from 'plural-ru';

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
   * Добавление в корзину
   * @param code
   */
  addToCart(code) {
    let newCart = this.state.cart;

    this.state.items.map(item => {
      if (item.code === code) {
        if (newCart.find(el => el.code == code)) {
          newCart.find(el => el.code === code).quantity++
        } else {
          newCart = newCart.concat(item)
          newCart.map(item => {
            if (item.code === code) {
              item.quantity = 1;
            }
          });
          }
        }
        // console.log(this.state)
        this.setState({
          ...this.state,
          cart: newCart
        })
      })
  }

  /**
   * Удаление товаров из корзины
   * @param code
   */
  removeFromCart(code) {
    let newCart = this.state.cart;

    newCart.map(item => {
      if (item.code === code) {
        
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          newCart = newCart.filter(item => item.code !== code)
        }
      }

      this.setState({
        ...this.state,
        cart: newCart
      })
    })
  }

  calculateCart() {
    let quantity = 0, sum = 0
    this.state.cart.map(item => {
      quantity = quantity + item.quantity
      sum = sum + (item.quantity * item.price)
    })
    if (quantity === 0) {
      return 'пусто'
    } else {
      return `${quantity} ${plural(quantity, 'товар', 'товара', 'товаров')} / ${sum.toLocaleString('ru-RU')} ₽`
    }
  }

  calculateCartSum() {
    let sum = 0, quantity = 0
    this.state.cart.map(item => {
      sum = sum + (item.quantity * item.price)
      quantity = quantity + 1
    })

    if ((sum === 0) && (quantity === 0)) {
      return null
    } else {
    return `${sum.toLocaleString('ru-RU')} ₽`
    }
  }

}

export default Store;
