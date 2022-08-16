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
      pagesCount: 1,
      currentPage: 1,
      itemsOnPage: 10,
    };
  }

  async load(currentPage = 1){
    const response = await fetch(`/api/v1/articles?limit=${this.getState().itemsOnPage}&skip=${(currentPage - 1) * this.getState().itemsOnPage}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      pagesCount: Math.ceil(json.result.count / this.getState().itemsOnPage),
      currentPage: currentPage
    }, 'Загрузка выбранной страницы');
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
