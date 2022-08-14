import counter from "../../utils/counter";
import StateModule from "../module";
import axios from "axios";
import CatalogApi from "../../api/catalog";

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
      totalPages: 1,
      currentPage: 1,
      totalCount: 10,
      count: 0
    };
  }


  async load(limit=10, skip= 0) {
    const response = await CatalogApi.getArticles(limit,skip)
    this.setState({
      items: response
    })
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
