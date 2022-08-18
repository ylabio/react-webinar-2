import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      count: 0,
      limit: 10,
      skip: 0
    };
  }
  /**
   * Загрузка товаров
   * @param limit {String}
   * @param skip {String}
   * @param fields {String}
   * @param count {Boolean}
   */
  async load({ fields, count } = { fields: "items(*)", count: true }) {
    const limit = this.getState().limit ?? 10;
    const skip = this.getState().skip ?? 0;
    fields = fields ?? "items(*)";
    count = count || true;

    this.store.get('params').setIsLoaded(false);
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}&fields=${fields}${count && ", count"}`);
    const json = await response.json();
    if (count === true) {
      this.setState({
        ...this.getState(),
        items: json.result.items,
        count: json.result.count
      }, `load ${limit} items`);
    }
    if (count === false) {
      this.setState({
        ...this.getState(),
        items: json.result.items
      }, `load ${limit} items`);
    }
    this.store.get('params').setIsLoaded(true);
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      items: this.getState().items.concat({ _id, title, price, selected })
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }

  /**
 * Устанавливает параметры загрузки товаров
 * @param limit {number} отвечает за то, сколько товаров будет выводится в каталоге
 * @param skip {number} отвечает за то, какие limit товаров будут выводится в каталоге (первые 10 или с 30 по 50...)
 */
  setLoadOptions({ limit, skip }) {
    limit = limit ?? this.getState().limit;
    skip = skip ?? this.getState.skip;
    this.setState({
      ...this.getState(),
      limit,
      skip
    }, `установка параметров загрузки товаров`)
  }
}

export default CatalogState;
