import {generate} from 'shortid';
import { calcTotalPrice } from './utils';

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

  /*
   * Обновление массива для items в shoppingCart
   * @param type {string} Тип изменения добавить или удалить
   * @param item {object} Объект элемента который добавляется или удаляется
   * @return {Array} Обновленный shoppingCart
  */
  #updateCartItems(type, item) {
    const cartItems = this.state.shoppingCart.items;
    const index = cartItems.findIndex(product => product.code === item.code);
    const product = cartItems[index];
    
    // прибавляет или уменьшает кол-во товара в объекте
    // получает число 1 или -1
    // возвращает массив с обновленным объектом
    const updatedItems = (digit) => [
      ...cartItems.slice(0, index), 
      {...product, count: product.count + digit}, 
      ...cartItems.slice(index + 1)
    ];

    switch(type) {
      case 'ADD':
        if(index === -1) {
          return [...cartItems, {...item, count: 1, _id: generate()}]
        }
        return updatedItems(1);

      case 'DELETE':
        if(product.count - 1 === 0) {
          return cartItems.filter(item => item.code !== product.code);
        }
        return updatedItems(-1);

      default:
        return cartItems;
    }
  }

  /**
   * Добавление объекта в корзину
   * @param item {object}
   */
  addItemToCart(item) {
    const items = this.#updateCartItems('ADD', item);
    this.setState({
      ...this.state,
      shoppingCart: { 
        ...this.state.shoppingCart, 
        items, 
        totalPrice: calcTotalPrice(items)
      }
    });
  }

  /**
   * Удаление/уменьшение кол-ва элементов из корзины
   * @param item {object}
   */
  deleteItemFromCart(item) {
    const items = this.#updateCartItems('DELETE', item);
    this.setState({
      ...this.state,
      shoppingCart: {
        ...this.state.shoppingCart,
        items,
        totalPrice: calcTotalPrice(items)
      }
    });
  }
}

export default Store;
