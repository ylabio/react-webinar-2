import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      page: 1,
      itemCount: 0,
      pageCount: 0,
      contentPerPage: 10,
    };
  }

  async load(limit, page) {
    const response = await fetch(
      `/api/v1/articles?lang=ru?limit=${limit}&skip=${
        limit * (page - 1)
      }&fields=items(*),count`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      itemCount: json.result.count,
      pageCount: Math.ceil(json.result.count / this.getState().contentPerPage),
    });
  }
 
 /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState(
      {
        items: this.getState().items.concat({ _id, title, price, selected }),
      },
      'Создание товара'
    );
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
       this.setState(
      {
        items: this.getState().items.filter((item) => item._id !== _id),
      },
      'Удаление товара'
    );
  }

  /**
   * Переключение страницы
   */
   setPage(page) {
    this.setState({
      ...this.getState(),
      page: page,
    });
  }
}
export default CatalogState;
