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
      totalPages: 0,
      itemsPerPage: 10
    };
  }

  async load(){
    const skip = (this.getState().currentPage-1)*this.getState().itemsPerPage
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      totalPages: Math.ceil(json.result.count/this.getState().itemsPerPage),
    });
  }
  
  /**
   * Переключение страницы
   * @param page
   */
  
  switchPage(page){
    this.setState({
      ...this.getState(),
      currentPage: page
    }, ['Переключение страницы'])
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
