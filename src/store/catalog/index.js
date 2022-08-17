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
      curentPage: 1,
      itemsPerPage: 10,
      firsItemIndex: 0,
      lastItemIndex: 2,
      pageNumber: Math.ceil(this.store.getState().catalog?.count / 10)
    };
  }

  async loadStart(){
    //const response = await fetch('/api/v1/articles?lang=ru');
    const response = await fetch('/api/v1/articles?fields=items(*),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      count: json.result.count
    });
    this.store.get('catalog').paginate(this.getState().curentPage);
  }

  paginate(Page)
  {
    let firsItemIndex = (Page - 1) * this.getState().itemsPerPage;
    let lastItemIndex = firsItemIndex + this.getState().itemsPerPage;
    let pageNumber = Math.ceil(this.getState().count / this.getState().itemsPerPage);
    this.setState({
        ...this.getState(),
        curentPage: Page,
        firsItemIndex: firsItemIndex,
        lastItemIndex: lastItemIndex,
        pageNumber: pageNumber
    });
    this.store.get('catalog').loadItems(this.getState().itemsPerPage, this.getState().firsItemIndex);
  }

  async loadItems(limit, skip){
    //const response = await fetch('/api/v1/articles?lang=ru');
    const response = await fetch(`/api/v1/articles?lang=ru&limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
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
}

export default CatalogState;
