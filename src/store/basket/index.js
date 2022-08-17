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

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзие, чтобы увеличить его количество. Заодно получаем новый массив items
    let exists = false;
    const items = this.getState().items.map(item => {
      let result = item;
      // Искомый товар для увеличения его количества
      if (item._id === _id) {
        exists = true;
        result = {...item, amount: item.amount + 1};
      }
      // Добавляея в общую сумму
      sum += result.price * result.amount;
      return result
    });

    // Если товар не был найден в корзине, то добавляем его из API
    if (!exists) {
      const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();

      if (!json.result) {
        console.error(`В JSON файле товара ошибка`)
        return
      }

      const item = json.result;
      items.push({...item, amount: 1});
      sum += item.price;
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Добавление в корзину');
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
