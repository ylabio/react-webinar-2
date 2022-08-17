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
      limit: 10,
      pageCount: 14,
      selectedItem: null,
      lang: "ru",
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch(
      `/api/v1/articles?limit=${this.getState().limit}&skip=${
        (this.getState().currentPage - 1) * this.getState().limit
      }&fields=items(*),count`
    );
    const json = await response.json();
    console.log(json);
    this.setState({
      ...this.getState(),
      items: json.result.items,
      isLoading: false,
      pageCount: Math.ceil((json.result.count - 1) / this.getState().limit),
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

  changeLang(code) {
    console.log(code);
    this.setState({
      ...this.state,
      lang: code,
    });
  }
}

export default CatalogState;
