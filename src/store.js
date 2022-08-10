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
      this.state.items.map(item => {
        if (item.code === code) {
          if (!this.state.cart.find(el => el.code == code)) {
            this.setState({
              ...this.state,
              cart: this.state.cart.concat([{...item, quantity: 1}])
            })
            console.log('this.state after')
            console.log(this.state)
          } else {
            this.setState({
              ...this.state,
              cart: this.state.cart.map(item => {
                if(item.code === code){
                  return {
                    ...item,
                    quantity: item.quantity + 1
                  }
                }
                return item;
            })
          })
        }
      }
    })
  }


  /**
   * Удаление товаров из корзины
   * @param code
   */
  
  removeFromCart(code) {
      this.state.cart.map(item => {
        if (item.code === code) {
            this.setState({
              ...this.state,
              cart: this.state.cart.filter(item => item.code !== code)
            })
        }
      })
    }


  calculateCartItemsSum() {
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
