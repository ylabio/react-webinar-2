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
      items: [],
      itemsNuberPerPage: 10, // Дефолт значение количества товаров на страницу
      itemsQuantity: 'idle',
      activePage: 'idle', 
    };
  }

  async load(){
    const query = routes.initialLoad();
    const response = await fetch(query);
    const json = await response.json();
    const pathToQuantity = '/api/v1/articles?limit=20&skip=10&fields=items(*),count'
    const itemsResposne = await fetch(pathToQuantity)
    const itemsQuantity = await itemsResposne.json()
    this.setState({
      ...this.store.state.catalog,
      items: json.result.items,
      itemsQuantity: itemsQuantity.result.count,
      activePage: 0, // По загрузке приложение первая страница имеет индекс 0
    });
  }

  async loadPage(_indexNumber, itemsNuberPerPage){
    const skip = _indexNumber * itemsNuberPerPage;
    const query = routes.pagination(itemsNuberPerPage, skip);
    const response = await fetch(query);
    const json = await response.json();
    this.setState({
      ...this.store.state.catalog,
      items: json.result.items,
    });
  }

  setActivePage(_indexNumber){
    this.setState({
      ...this.store.state.catalog,
      activePage: _indexNumber,
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
