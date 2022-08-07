/**
 * Состояние корзины
 */
class BasketState {

  constructor(store) {
    this.store = store;
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
        sum: 0,
        amount: 0
    };
  }

  /**
   * Добавление товара в корзину
   * @param code Код товара
   */
  addToBasket(code) {
    let sum = 0;
    // Ищем товар в корзие, чтобы увеличить его количество. Заодно получаем новый массив items
    let exists = false;
    const items = this.store.getState().basket.items.map(item => {
      let result = item;
      // Искомый товар для увеличения его количества
      if (item.code === code) {
        exists = true;
        result = {...item, amount: item.amount + 1};
      }
      // Добавляея в общую сумму
      sum += item.price * item.amount;
      return result
    });

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      // @todo В реальных приложения будет запрос к АПИ на добавление в корзину, и апи выдаст объект товара..
      const item = this.store.getState().catalog.items.find(item => item.code === code);
      items.push({...item, amount: 1});
      // Досчитываем сумму
      sum += item.price;
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.store.setState({
      ...this.store.state,
      basket: {
        items,
        sum,
        amount: items.length
      }
    });
  }

  /**
   * Добавление товара в корзину
   * @param code Код товара
   */
  removeFromBasket(code) {
    let sum = 0;
    const items = this.store.getState().basket.items.filter(item => {
      // Удаляемый товар
      if (item.code === code) return false
      // Подсчёт суммы если твоар не удаляем.
      sum += item.price * item.amount;
      return true;
    });
    this.store.setState({
      ...this.store.state,
      basket: {
        items,
        sum,
        amount: items.length
      }
    })
  }
}

export default BasketState;
