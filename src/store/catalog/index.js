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
      limit: 10,
      total: 0,
      pages: 0,
      current_page: 1,
    };
  }

  async load(page) {
    const { limit } = this.getState();
    const skip = limit * (page - 1);
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.json();
    const { items, count } = json.result;
    const pages = Math.ceil(count / limit);
    // console.log(json.result);
    this.setState({
      ...this.getState(),
      items,
      total: count,
      pages,
      current_page: page,
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
