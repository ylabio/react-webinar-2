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
      isLoading: false,
      items: [],
      currentPage: 1,
      pageCount: 14,
      selectedItem: null,
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${
        this.getState().currentPage - 1
      }0&fields=items(*),count`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      isLoading: false,
      pageCount: Math.ceil((json.result.count - 1) / 10),
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
  //Смена страницы
  changePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }
}

export default CatalogState;
