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
      items: [],
      count: 0,
      pagesCount: 0,
      pageSelected: 0,
      pageForSkip: 0,
    };
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${10}&skip=${this.getState().pageForSkip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
      pagesCount: this.getState().pagesCount == 0 ? (Math.ceil(json.result.count / 10)) : this.getState().pagesCount,
      pageSelected: this.getState().pageSelected == 0 ? (json.result.count > 1 ? 1 : 0) : this.getState().pageSelected,
      pageForSkip: this.getState().pageForSkip,
    });
  }

  updateRender(){
    this.setState({
      items: this.getState().items,
      count: this.getState().count,
      pagesCount: this.getState().pagesCount,
      pageSelected: this.getState().pageSelected,
      pageForSkip: this.getState().pageSelected * 10 - 10
    })
  }
  onPageChange(n = 1) {
    this.setState({
      items: this.getState().items,
      count: this.getState().count,
      pagesCount: this.getState().pagesCount,
      pageSelected: n,
      pageForSkip: this.getState().pageSelected * 10
    })
    this.updateRender();
    this.load()
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      items: this.getState().items.concat({ _id, title, price, selected })
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
