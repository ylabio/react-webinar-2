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
   * Создание записи
   */
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, price, selected})
    });
  }

    /**
   * Открывает popup
   */
 openModal() {
   this.setState({
     ...this.state,
     isOpen: true,
   });
 }

 /**
  * Закрывает popup
  */
 closeModal() {
   this.setState({
     ...this.state,
     isOpen: false,
   });
 }

 /**
  * Добавление в корзину
  */
 addItemToBucket(code) {
   const item = this.state.items.find(i => i.code === code);
   const isBucketItem = this.state.bucketItems.find(bucketItem => bucketItem.code === item.code);

   let bucketItems = [];
   if (isBucketItem) {
    bucketItems = this.state.bucketItems.map(bucketItems => {
       return bucketItems.code === item.code ? {...bucketItems, amount: bucketItems.amount + 1} : bucketItems;
     });
   } else {
    bucketItems = [...this.state.bucketItems, {...item, amount: 1}];
   }

   this.setState({
     ...this.state,
     bucketItems,
   });
 }
/**
   * Удаление из корзины по её коду
   * @param code
   */
 deleteBucketItem(code) {
    this.setState({
      ...this.state,
      bucketItems: this.state.bucketItems.filter(bucketItem => bucketItem.code !== code)
    });
  }
}

export default Store;
