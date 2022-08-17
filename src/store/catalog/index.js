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
      page: 1,
      pagesAmount: 0,
    };
  }

  async load(page) {
    let skip = page - 1;

    const response = await fetch(
      `/api/v1/articles?skip=${skip ? skip : (page = 0)}0`
    );
    const json = await response.json();

    this.setState({
      ...this.store.state.catalog,
      items: json.result.items,
    });
  }

  async loadPages(page) {
    const response = await fetch(
      `/api/v1/articles?limit=*&fields=items(*),count`
    );
    const json = await response.json();

    this.setState({
      ...this.store.state.catalog,
      page,
      pagesAmount: Math.ceil(json.result.count / 10),
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
