import { config } from "../../config";
import counter from "../../utils/counter";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      total: null,
      currentPage: 1,
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.store.state.catalog,
      items: json.result.items
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.store.state.catalog,
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      ...this.store.state.catalog,
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }

  async getGoods( 
    skip = config.API_SKIP, 
    limit = config.API_LIMIT, 
  ) {
    const response = await fetch(`/api/v1/articles?lang=ru&limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.store.state.catalog,
      items: json.result.items,
      total: json.result.count,
    });
  }

  changeCurrentPage(page) {
    this.setState({
      ...this.store.state.catalog,
      currentPage: page, 
    })
  }
}

export default CatalogState;
