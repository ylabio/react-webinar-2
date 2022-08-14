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
      totalItems: 0,
    };
  }

  async load(){
    const skip = (this.getState().currentPage-1)*10
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      totalItems: json.result.count,
      currentPage: this.getState().currentPage
    });
  }
  
  /**
   * Переключение страницы
   * @param page
   */
  
  switchPage(page){
    this.setState({
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
