import { getItems } from "../../service";
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
      count: 0,
      limit: 10,
      currentPage: 1,
    };
  }

  async load(limit, skip){
    const data = await getItems(limit, skip);
    this.setState({
      ...this.store.getState().catalog,
      items: data.items,
      count: data.count
    });
  }

  setCurrentPage(page) {
    this.setState({
      ...this.store.getState().catalog,
      currentPage: page,
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
