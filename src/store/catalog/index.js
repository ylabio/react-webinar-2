import counter from "../../utils/counter";
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
      requestParameters: {
        page: 1,
        limit: 10,
      },
      count: 0,
      isLoading: true,
    };
  }

  async load(page) {
    const limitPage = this.getState().requestParameters.limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limitPage}&skip=${
        limitPage * (page - 1)
      }&fields=items(*),count`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      requestParameters: { ...this.getState().requestParameters, page: page },
      isLoading: false,
    });
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = "Новый товар", price = 999, selected = false }) {
    this.setState(
      {
        ...this.state,
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
        ...this.state,
        items: this.getState().items.filter((item) => item._id !== _id),
      },
      "Удаление товара"
    );
  }
}

export default CatalogState;
