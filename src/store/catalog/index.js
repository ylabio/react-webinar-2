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
      pageSize: 10,
      pageCurrent: 1,
    };
  }

  async load(pageCurrent, pageSize) {
    const response = await fetch(
      `/api/v1/articles?limit=${pageSize}&skip=${
        (pageCurrent - 1) * pageSize
      }&fields=items(*),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        items: json.result.items,
        count: json.result.count,
      },
      "Загрузка данных с сервера"
    );
  }

  async pageChanged(pageNumber) {
    this.setState(
      {
        ...this.getState(),
        pageCurrent: pageNumber,
      },
      "Изменение страницы каталога"
    );
  }
  /**
   * Создание записи
   */
  createItem({ _id, title = "Новый товар", price = 999, selected = false }) {
    this.setState(
      {
        items: this.getState().items.concat({ _id, title, price, selected }),
      },
      "Создание товара"
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
      "Удаление товара"
    );
  }
}

export default CatalogState;
