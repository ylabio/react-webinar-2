class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    this.cartItems = [];
    // Слушатели изменений state
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  getCartItems() {
    return this.cartItems;
  }

  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener();
    }
  }

  getPrice() {}

  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  removeItem(code) {
    let currentItem = this.cartItems.find((item) => item.code == code);
    let currentItemIndex = this.cartItems.findIndex(
      (item) => item.code == code
    );
    this.setState({
      ...this.state,
      ...this.cartItems,
      cartItems: this.cartItems.map((item) => {
        if (item == currentItem) {
          return {
            ...item,
            count:
              item.count > 1
                ? item.count--
                : this.cartItems.map((item) => {
                    if (item == currentItem) {
                      this.cartItems.splice(currentItemIndex, 1);
                    }
                  }),
          };
        }
      }),
    });
  }

  addItemInCart(code) {
    let currentItem = this.state.items.find((item) => item.code == code);
    let isItemInCart = this.cartItems.some((item) => item.code == code);
    this.setState({
      ...this.cartItems,
      ...this.state,
      cartItems: isItemInCart
        ? this.state.items.map((item) => {
            if (item === currentItem) {
              return {
                ...item,
                count: ++item.count,
              };
            }
            return item;
          })
        : this.cartItems.push(currentItem),
    });
  }
}

export default Store;
