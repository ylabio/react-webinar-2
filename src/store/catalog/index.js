import counter from "../../utils/counter";
import StateModule from "../module";
import {renderPagination} from "../../utils/render-pagination";

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
      page: 0,
      limit: 10,
      _pages: 0,
      pagination: [],
    };
  }

  /**
   * Пагинация
   */

  async load(skip, limit){
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip * limit}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      page: skip,
      limit: limit,
      pages: Math.ceil(json.result.count / limit) - 1,
      pagination: renderPagination(Math.ceil(json.result.count / limit) - 1, skip),
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;
