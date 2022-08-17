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
      skip: 0,
      pages: 0,
    };
  }

  async load(skip) {
    const response = await fetch(
      `/api/v1/articles?lang=ru&limit=10&skip=${skip}&fields=items(*),count`
    );
    const json = await response.json();
    this.setState({
      items: json.result.items,
      skip,
      pages: Math.ceil(json.result.count / 10),
    });
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?lang=ru&fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();

    this.setState({
      ...this.getState(),
      currentProduct: json.result,
    });
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
