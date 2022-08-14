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
      count: 0
    };
  }
  /**
   * Загрузка товаров
   * @param limit {String}
   * @param skip {String}
   * @param fields {String}
   * @param count {Boolean}
   */
  async load({ limit, skip, fields, count } = { limit: 10, skip: 0, fields: "items(*)", count: true }) {
    limit = limit ?? 10;
    skip = skip ?? 0;
    fields = fields ?? "items(*)",
    count = count || true;

    this.store.get('params').setIsLoaded(false);
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}&fields=${fields}${count && ", count"}`);
    const json = await response.json();
    if (count === true) {
      this.setState({
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
}

export default CatalogState;
