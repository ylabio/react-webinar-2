import ModuleState from '../module';

/**
 * Состояние корзины
 */
class BasketState extends ModuleState {

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
   * Получение записи с сервера по ее коду
   * @param id
   */
  async #load(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    return json.result;
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество. Заодно получаем новый массив items
    let exists = false;
    const items = this.getState().items.map(item => {
      let result = item;
      // Искомый товар для увеличения его количества
      if (item._id === _id) {
        exists = true;
        result = { ...item, amount: item.amount + 1 };
      }
      // Добавляем в общую сумму
      sum += result.price * result.amount;
      return result;
    });

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      const item = await this.#load(_id);
      items.push({ ...item, amount: 1 });
      // Досчитываем сумму
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
      if (item._id === _id) return false;
      // Подсчёт суммы если твоар не удаляем.
      sum += item.price * item.amount;
      return true;
    });
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Удаление из корзины');
  }
}

export default BasketState;
