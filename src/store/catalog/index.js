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
      currentPage: 1,
      totalPages: 1,
      item: {},
      limit: 10,
    };
  }

  async load(){
    const response = await fetch(`/api/v1/articles?limit=${this.store.state.catalog.limit}&skip=0&fields=items(*),count`);
    const json = await response.json();
    const totalPages = (json.result.count/10)%1 !== 0 ? Math.trunc(json.result.count/10) + 1: (json.result.count/10);
    this.setState({
      items: json.result.items,
      currentPage: 1,
      totalPages: totalPages,
      item: this.store.state.catalog.item
    });
  }

  async loadPage(page) {
    console.log(page)
    const response = await fetch(`/api/v1/articles?limit=${this.store.state.catalog.limit}&skip=` + `${10*(page-1)}`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      currentPage: page,
      totalPages: this.store.state.catalog.totalPages,
      item: this.store.state.catalog.item
    });
  }

  async loadItem(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result,
      items: [...this.store.state.catalog.items, json.result],
      currentPage: this.store.state.catalog.currentPage,
      totalPages: this.store.state.catalog.totalPages
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
