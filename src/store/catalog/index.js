import StateModule from "../module";
import routes from '../../API/routes';

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
    const query = routes.initialLoad();
    const response = await fetch(query);
    const json = await response.json();
    this.setState({
      items: json.result.items,
    });
  }

  async loadPage(_indexNumber, itemsNuberPerPage){
    const skip = _indexNumber * itemsNuberPerPage;
    const query = routes.pagination(itemsNuberPerPage, skip);
    const response = await fetch(query);
    const json = await response.json();
    this.setState({
      items: json.result.items,
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
