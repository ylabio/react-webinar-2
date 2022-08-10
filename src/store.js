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
      this.listeners = this.listeners.filter((item) => item !== callback);
    };
  }

  /**
   * Создание записи
   */
  createItem({ code, title = "Новый товар", price = 999, selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, price, selected }),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      orders: this.state.orders.filter((order) => order.code !== code),
    });
    this.getTotalPrice();
    this.getTotalCount(-1);

  }
  /**
   * Увелечение общей суммы всех товаров
   *
   */
  getTotalPrice() {
    const { orders} = this.state;

    let total = orders
      .map((order) => order.total)
      .reduce((prev, curr) => prev + curr, 0);
   
    this.setState({
      ...this.state,
      total: total,
    });
  }

  /**
   * Увелечение общей суммы уникальных товаров
   *
   */

  getTotalCount (number) {
    const {uniqueOrder} = this.state;
    this.setState({
      ...this.state,
      uniqueOrder: uniqueOrder + number,
    })
  }

  /**
   * Добавление товара в корзину по коду
   * @param code
   */
  addItemToBasket(item) {
    const { orders } = this.state;
    const { code } = item;

    item.count = 1;
    item.total = item.count * item.price;

    if (orders.length === 0) {
      this.setState({
        ...this.state,
        orders: orders.concat(item),
      });
      this.getTotalPrice();
      this.getTotalCount(1);

    } else {
      if (orders.find((order) => order.code === item.code)) {
        this.setState({
          ...this.state,
          orders: orders.map((order) => {
            if (order.code === item.code) {
              return {
                ...order,
                count: (order.count += 1),
                total: order.count * order.price,
              };
            }
            return order;
          }),
        });
        this.getTotalPrice();
      } else {
        this.setState({
          ...this.state,
          orders: [...orders, item],
        });
        this.getTotalPrice();
      this.getTotalCount(1);

      }
    }
  }
  

}
export default Store;
