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
      count: 1,
      activePage: 1
    };
  }

  async load(activePage){
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(activePage - 1) * 10}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: Math.ceil(json.result.count / 10),
      activePage: activePage
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

  /**
   * Переход на выбранную страницу
   * @param activePage
   */
  setPage(activePage) {
    this.setState({
      ...this.getState(),
      activePage: activePage
    }, 'Переход на выбранную страницу');
  }
}

export default CatalogState;
