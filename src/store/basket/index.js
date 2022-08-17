import StateModule from "../module";

/**
 * Состояние корзины
 */
class BasketState extends StateModule{

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

  // добавление в корзину
  // вызывается со страницы товара и из каталога
  //
  addToBasket(_id) {
    let items = this.getState().items;
    const index = items.findIndex(item => _id === item._id);

    if (index === -1) {
      let item = this.store.getState().catalog.pageItems.find(item => _id === item._id); // найден в сторе каталога
      if (!item) item = this.store.getState().product.details; // или в сторе страницы товара
      items.push({ ...item, amount: 1 });
    }
    else items[index].amount += 1;

    this.setState({
      items,
      sum: items.reduce((sum, item) => sum + item.price * item.amount, 0),
      amount: items.length
    }, 'Добавление в корзину')
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const items = this.getState().items.filter(item => {
      // Удаляемый товар
      if (item._id === _id) return false
      // Подсчёт суммы если твоар не удаляем.
      sum += item.price * item.amount;
      return true;
    });
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Удаление из корзины')
  }
}

export default BasketState;
