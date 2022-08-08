import { getCartCost } from "./utils";

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
   * Добавление в корзину.
   * Если товар уже есть, его количество инкрементируется
   * @param {number} code Айдишник товара
   */
  addInCart(code) {
    const cb = (el) => el.code === code
    const newCart = {
      ...this.state.cart,
      items: [...this.state.cart.items]
    }

    const stagedElem = newCart.items.find(cb)

    if (stagedElem) {
      newCart.items[newCart.items.indexOf(stagedElem)] = {
        ...stagedElem, 
        count: stagedElem.count + 1
      } 
    } else {
      newCart.items.push({ // Не мутация изначального состояния
        ...this.state.items.find(cb), 
        count: 1
      })
      newCart.items.sort((a, b) => a.code - b.code) // Чтобы выглядело красиво и по порядку
                                                    // Это не мутация изначального состояния, реакту хорошо
    }

    newCart.cost = getCartCost(cb, 'add', this.state)
    this.setState({
      ...this.state,
      cart: newCart // Даже ссылка новая!
    })
  }

  /**
   * Удаление товара из корзины
   * @param {number} code Айдишник товара
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cost: getCartCost(el => el.code === code, 'delete', this.state),
        items: this.state.cart.items.filter(el => el.code !== code)
      }
    });
  }
}

export default Store;
