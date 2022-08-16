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
      loading: false,
      error: "",
      num: 0,
    };
  }

  async load() {
    try {
      this.setState({
        ...this.store.state.catalog,
        loading: true,
      });
      const response = await fetch(
        `/api/v1/articles?limit=10&skip=0&fields=items(*),count`
      );
      const json = await response.json();
      this.setState({
        ...this.store.state.catalog,
        loading: false,
        count: Math.ceil(json.result.count / 10),
        items: { ...this.store.state.catalog.items, 0: json.result.items },
      });
    } catch (e) {
      this.setState({
        ...this.store.state.catalog,
        loading: false,
        error: e.message,
      });
    }
  }

  async loading(n) {
    try {
      this.setState({
        ...this.store.state.catalog,
        loading: true,
      });
      const response = await fetch(`/api/v1/articles?limit=10&skip=${n}0`);
      const json = await response.json();
      this.setState({
        ...this.store.state.catalog,
        loading: false,
        items: { ...this.store.state.catalog.items, [n]: json.result.items },
      });
    } catch (e) {
      this.setState({
        ...this.store.state.catalog,
        loading: false,
        error: e.message,
      });
    }
  }

  newPage(n) {
    this.setState(
      { ...this.store.state.catalog, num: n },

      `Новая страница`
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
