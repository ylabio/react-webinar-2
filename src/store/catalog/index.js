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

  async getItemsForPage(pageSize = 10, skip, pageNumber = 1){
    try{
      const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skip}&fields=items(*),count`);
      const json = await response.json();
      this.store.setState({
        ...this.store.state,
        catalog: {items: json.result.items, totalCount: json.result.count, currentPage: pageNumber, countForPage: pageSize}
      })
    } catch (error) {
         console.error(error)
    }
  }

  setCurrentPage(number){
    this.store.setState({
      ...this.store.state,
      catalog: {
        items: [...this.store.state.catalog.items],
        totalCount: this.store.state.catalog.totalCount,
        currentPage: number,
        countForPage: this.store.state.catalog.countForPage
      }
    })
  }

}

export default CatalogState;
