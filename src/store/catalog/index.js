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
      page: 1,
      totalAmount: null,
      limit: 10,
      totalPages: null,
    };
  }

  setPage(num) {
    this.setState({
      ...this.getState(),
      page: num,
    });
  }

  async load(limit, skip) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`,
    );
    const json = await response.json();
    const totalAmount = json.result.count
    const totalPages = Math.ceil(totalAmount / this.getState().limit)
    this.setState({
      ...this.getState(),
      items: json.result.items,
      totalAmount,
      totalPages,
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
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
