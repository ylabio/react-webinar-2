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
  createItem({ code, title = 'Новый товар', price = 999, selected = false }) {
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
      items: this.state.items.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  addBucket(code) {
    const inBucket = this.state.bucket.bucketElements.map((item) => item.code);

    if (!inBucket.includes(code)) {
      const [choosenItem] = this.state.items.filter(
        (item) => item.code === code
      );
      this.setState({
        ...this.state,
        bucket: {
          bucketElements: [
            ...this.state.bucket.bucketElements,
            { ...choosenItem, amount: 1 },
          ],
          totalPrice: this.state.bucket.totalPrice + choosenItem.price,
          totalAmount: this.state.bucket.bucketElements.length + 1,
        },
      });
    } else {
      this.state.bucket.bucketElements.forEach((item) => {
        if (item.code === code) {
          item.amount += 1;
          this.setState({
            ...this.state,
            bucket: {
              ...this.state.bucket,
              totalPrice: this.state.bucket.totalPrice + item.price,
            },
          });
        }
      });
    }
  }

  deleteBucket(code) {
    const deletedItem = this.state.bucket.bucketElements.find(
      (item) => item.code === code
    );

    this.setState({
      ...this.state,
      bucket: {
        bucketElements: [
          ...this.state.bucket.bucketElements.filter((item) => item.code !== code),
        ],
        totalPrice:
          this.state.bucket.totalPrice - deletedItem.price * deletedItem.amount,
        totalAmount: this.state.bucket.bucketElements.length - 1,
      },
    });
  }
}

export default Store;
