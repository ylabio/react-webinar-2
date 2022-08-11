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

  countTotalPrice() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        totalPrice: Object.keys(this.state.cart.items)
          .reduce((totalPrice, itemCode) => {
            return totalPrice + Number(this.state.cart.items[itemCode].price) * this.state.cart.items[itemCode].cartCount
          }, 0)
      }
    });
  }

  addToCart(item) {
    if (this.state.cart.items[item.code]) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          items: {
            ...this.state.cart.items,
            [item.code]: {
              ...this.state.cart.items[item.code],
              cartCount: this.state.cart.items[item.code].cartCount + 1
            },
          },
        }
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          items: {
            ...this.state.cart.items,
            [item.code]: {
              ...item,
              cartCount: 1
            },
          },
          uniqueItems: this.state.cart.uniqueItems + 1,
        }
      });
    }
    this.countTotalPrice()
  }

  deleteFromCart(item) {
    const itemsWithoutDeleted = {...this.state.cart.items}
    delete itemsWithoutDeleted[item.code];
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: {
          ...itemsWithoutDeleted
        },
        uniqueItems: this.state.cart.uniqueItems - 1,
      },
    });
    this.countTotalPrice();
  }
}

export default Store;

// countTotalPrice(item) {
//   this.setState({
//     ...this.state,
//     cart: {
//       ...this.state.cart,
//       totalPrice: this.state.cart.items.reduce((totalPrice, {
//         price,
//         cartCount
//       }) => totalPrice + Number(price) * cartCount, 0)
//     }
//   });
// }
// addToCart(item) {
//   if (this.state.cart.items.some((cartItem) => cartItem.code === item.code)) {
//     this.setState({
//       ...this.state,
//       cart: {
//         ...this.state.cart,
//         items: this.state.cart.items.map((cartItem) =>
//           cartItem.code === item.code
//             ? {...cartItem, cartCount: cartItem.cartCount + 1}
//             : cartItem,
//         ),
//       }
//     });
//   } else {
//     this.setState({
//       ...this.state,
//       cart: {
//         ...this.state.cart,
//         items: this.state.cart.items.concat({...item, cartCount: 1}),
//         uniqueItems: this.state.cart.uniqueItems + 1,
//       }
//     });
//   }
//   this.countTotalPrice(item)
// }
//
// deleteFromCart(item) {
//   this.setState({
//     ...this.state,
//     cart: {
//       ...this.state.cart,
//       items: this.state.cart.items.filter((cartItem) => cartItem.code !== item.code),
//       uniqueItems: this.state.cart.uniqueItems - 1,
//     },
//   });
//   this.countTotalPrice(item);
// }
