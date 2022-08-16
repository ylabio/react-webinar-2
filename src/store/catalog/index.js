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
      count: 0,
      page: 1
    };
  }

  async load(skip){
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
      page: this.getState().page
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected}),
      count: 0,
      page: 1
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id),
      count: count,
      page: page
    }, 'Удаление товара');
  }

   /**
   * устанвока страницы
   * @param page номер страницы @param skip поиска
   */
  setPage(page){
    this.setState({
      items: this.getState().items,
      count: this.getState().count,
      page
    }, `Открытие страницы номер ${page}`);
  }
}

export default CatalogState;
