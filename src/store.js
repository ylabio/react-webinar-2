import { generate } from 'shortid';
import { calcTotalPrice } from './utils';

class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listeners = [];
  }

  /*
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /*
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

  /*
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  /*
   * Добавление/прибавление кол-ва товара в корзину
   * @param code {number}
   */
  addItemToCart(code) {
    const item = this.state.items.find((item) => item.code === code);
    const cartItems = this.state.shoppingCart.items;
    const items = cartItems.reduce(
      (items, product, index) => {
        // если объект встретился в массиве, то обновить объект
        // и вернуть массив без последнего элемента, который заведомо был инициализирован
        if (product.code === item.code) {
          items[index] = { ...product, count: product.count + 1 };
          return items.slice(0, -1);
        }
        return items;
      },
      // массив объектов корзины + новый объект
      // он останется если в редюсере не сработает условие
      // и таким образом добавится новый товар
      [...cartItems, { ...item, count: 1, _id: generate() }]
    );
    this.setState({
      ...this.state,
      shoppingCart: {
        ...this.state.shoppingCart,
        items,
        totalPrice: calcTotalPrice(items),
      },
    });
  }

  /*
   * Удаление товара из корзины
   * @param code {number}
   */
  deleteItemFromCart(code) {
    const items = this.state.shoppingCart.items.filter(
      (product) => product.code !== code
    );
    this.setState({
      ...this.state,
      shoppingCart: {
        ...this.state.shoppingCart,
        items,
        totalPrice: calcTotalPrice(items),
      },
    });
  }
}

export default Store;
