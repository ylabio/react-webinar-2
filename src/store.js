import { counter } from "./shared/utils";

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

  addItemToCart(item) {
    const goods = JSON.parse(JSON.stringify(this.state.goods));
    goods.price += item.price;
    goods.id = counter();

    if (item.code in goods.items) {
      const current = goods.items[item.code];

      if (!item.special) {
        current.quantity++;
        current.price += item.price;
        current.time = Date.now();
      }
      
    } else {
      goods.items[item.code] = {
        quantity: 1,
        price: item.price,
        data: item,
        time: Date.now(),
      };
      goods.total++;
    }

    this.setState({
      ...this.state,
      goods,
    });
  }

  removeItemFromCart(item) {
    const goods = JSON.parse(JSON.stringify(this.state.goods));
    goods.price -= item.data.price * item.quantity;
    goods.id = counter();
    
    delete goods.items[item.data.code];
    goods.total--;

    this.setState({
      ...this.state,
      goods,
    });
  }

  handleModal(arg) {
    this.setState({
      ...this.state,
      isCartOpen: arg,
    });
  }

  setCartHeight(height) {
    this.setState({
      ...thisState,
      cartHeight: height,
    })
  }
}

export default Store;
