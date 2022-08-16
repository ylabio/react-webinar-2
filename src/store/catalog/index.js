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
      items: []
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      items: json.result.items
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

  async getItem(_id){
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`)
    const json = await response.json()
    return json.result
  }

  async getItemsForPage(pageSize, skip, pageNumber = 1){
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.store.setState({
      ...this.store.state,
      catalog: {items: json.result.items, count: json.result.count, currentPage: pageNumber}
    })
  }

  setCurrentPage(number){
    console.log('setCurrentPage', this.store.state.catalog)
    console.log('ID', number)
    this.store.setState({
      ...this.store.state,
      catalog: {items: [...this.store.state.catalog.items], count: this.store.state.catalog.count, currentPage: number}
    })
  }

}

export default CatalogState;
