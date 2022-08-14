import Api from "../../API";
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
      pagesCount: null,
      limit: 10,
      skip: 0,
      currentPage: 1,
    };
  }

  async load(page) {
    try {
      const skip = (page - 1) * this.getState().limit;
      const response = await Api.getAll(this.getState().limit, skip);
      this.setState({
        items: response.items,
        pagesCount: Math.ceil(response.count / this.getState().limit),
        limit: this.getState().limit,
        currentPage: page,
        skip: skip,
      });
    } catch (error) {
      console.log(error);
    }
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
