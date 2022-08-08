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
    let newCart = Array.from(this.state.cart)
    let newCartItem = {}
    console.log('newCart')
    console.log(newCart)

    this.state.items.map(item => {
      if (item.code === code) {
        newCartItem = Object.assign(newCartItem, item)
      }
    })
    console.log(`newCartItem ${newCartItem}`)

    if (newCart.find(el => el.code == newCartItem.code)) {
      newCart.find(el => el.code == newCartItem.code).quantity++
    } else {
      newCartItem.quantity = 1;
      newCart = newCart.concat(newCartItem)
      }


    this.setState({
      ...this.state,
      cart: Array.from(newCart)
    })
    console.log('this.state.items')
    console.log(this.state.items)
  }

  /**
   * Удаление товаров из корзины
   * @param code
   */
  removeFromCart(code) {
    let newCart = Array.from(this.state.cart)
    let deleteCartItem = {}

    this.state.cart.map(item => {
      if (item.code === code) {
        deleteCartItem = Object.assign(deleteCartItem, item)
      }
    })

    if ((newCart.find(el => el.code == deleteCartItem.code)) && (deleteCartItem.quantity > 1)) {
      newCart.find(el => el.code == deleteCartItem.code).quantity--
    } else {
      newCart = newCart.filter(item => item.code !== deleteCartItem.code)
    }

    // newCart.map(item => {
    //   if (item.code === code) {
        
    //     if (item.quantity > 1) {
    //       item.quantity -= 1
    //     } else {
    //       newCart = newCart.filter(item => item.code !== code)
    //     }
    //   }

      this.setState({
        ...this.state,
        cart: Array.from(newCart)
      })
    }


  calculateCart() {
    let sum = 0
    this.state.cart.map(item => {
      sum = sum + (item.quantity * item.price)
    })
    if (this.state.cart.length === 0) {
      return 'пусто'
    } else {
      return `${this.state.cart.length} ${plural(this.state.cart.length, 'товар', 'товара', 'товаров')} / ${sum.toLocaleString('ru-RU')} ₽`
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
