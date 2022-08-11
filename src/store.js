import { getItemsQuantity, getTotalPrice } from "./utils";

class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  addItemInCart(item) {
    const isInCart = this.state.cart.itemsInCart.some(
      (el) => el.code === item.code
    );
    if (isInCart) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          itemsInCart: [...this.state.cart.itemsInCart].map((el) => {
            if (el.code === item.code) {
              return { ...el, quantity: ++el.quantity };
            }

            return el;
          }),
        },
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          itemsInCart: [
            ...this.state.cart.itemsInCart,
            { ...item, quantity: 1 },
          ],
        },
      });
    }
  }

  removeItem(code) {
    this.setState({
      ...this.state,
      cart: {
        itemsInCart: this.state.cart.itemsInCart.filter(
          (el) => el.code !== code
        ),
      },
    });
  }

  updateCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        totalPrice: getTotalPrice(this.state.cart.itemsInCart),
        totalQuantity: getItemsQuantity(this.state.cart.itemsInCart),
      },
    });
  }
}

export default Store;
