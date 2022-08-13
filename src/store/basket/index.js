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
      isFetching: false,
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

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      const catalogItems = this.store.getState().catalog.items;

      if (!catalogItems.length) {
        const lang = this.store.getState().language.language;
        const response = await fetch(`/api/v1/articles/${_id}?lang=${lang}&fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        items.push({...json.result, amount: 1});
        sum += json.result.price;
      } else {
         // Поиск товара в каталоге, чтобы его в корзину добавить
        // @todo В реальных приложения будет запрос к АПИ на добавление в корзину, и апи выдаст объект товара..
        const item = catalogItems.find(item => item._id === _id);
        items.push({...item, amount: 1});
        // Досчитываем сумму
        sum += item.price;
      }   
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.setState({
      ...this.store.getState().basket,
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

  async refreshGoods(ids) {
      this.#setIsFetching(true);

      const createRequest = async (id, amount) => {
        const lang = this.store.state.language.language;
        const response = await fetch(`/api/v1/articles/${id}?lang=${lang}&fields=*,maidIn(title,code),category(title)`);
        const json = await response.json();
        json.result.amount = amount;
        return json.result;
      };

      const requests = ids.map(good => {
        return createRequest(good.id, good.amount);
      });

      Promise.all(requests)
      .then(data => {
        this.setState({
          ...this.store.state.basket,
          items: [...data],
          isFetching: false,
        })
      })
  }

  #setIsFetching(flag) {
    this.setState({
      ...this.store.state.basket,
      isFetching: flag,  
    })
  }
}

export default BasketState;
