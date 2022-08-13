import counter from "../../utils/counter";
import { catalog } from "../exports";
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
      items: {},
      count: 0,
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=0&fields=items(*),count`
    );
    const json = await response.json();
    this.setState({
      ...this.store.state.catalog,
      count: Math.ceil(json.result.count / 10),
    });
    this.setState({
      ...this.store.state.catalog,
      items: { 0: json.result.items },
    });
  }

  async loading(n) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${n}0`);
    const json = await response.json();
    this.setState({
      ...this.store.state.catalog,
      items: { ...this.store.state.catalog.items, [n]: json.result.items },
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
