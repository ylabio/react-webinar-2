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
      count: 0,
      itemsPerPage: 10,
      currentPage: 1,
      items: []
    };
  }
  
  async load(pageNumber = 1){
    const firstItemIndex = (pageNumber - 1) * this.initState().itemsPerPage;
    const response = await fetch(`/api/v1/articles?&limit=${this.initState().itemsPerPage}&fields=items(*),count&skip=${firstItemIndex}`);
    const json = await response.json();
    this.setState({
      count: json.result.count,
      items: json.result.items,
      itemsPerPage: this.initState().itemsPerPage,
      currentPage: pageNumber
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
