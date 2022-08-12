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
      amount: 0,
      item: {},
      basketLang: 'ru',
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    this.#setBasketLang();
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

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      // @todo В реальных приложения будет запрос к АПИ на добавление в корзину, и апи выдаст объект товара..
      const item = this.store.getState().catalog.items.find(item => item._id === _id);
      items.push({...item, amount: 1});
      // Досчитываем сумму
      sum += item.price;
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.setState({
      ...this.store.state.basket,
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
      ...this.store.state.basket,
      items,
      sum,
      amount: items.length
    }, 'Удаление из корзины')
  }

  async getGoodById(id) {
    const lang = this.store.state.language.language;
    const response = await fetch(`/api/v1/articles/${id}?lang=${lang}&fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.store.state.basket,
      item: json.result,
    })
  }

  #setBasketLang() {
    this.setState({
      ...this.store.state.basket,
      basketLang: this.store.state.language.language,
    })
  }

  async refreshGoods(ids) {
      const createRequest = async (id) => {
        const lang = this.store.state.language.language;
        const response = await fetch(`/api/v1/articles/${id}?lang=${lang}&fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        return json.result;
      };

      const requests = ids.map(id => createRequest(id));

      Promise.all(requests)
      .then(data => {
        this.setState({
          ...this.store.state.basket,
          items: [...data],
        })
      })
  }
}

export default BasketState;
