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
      limit: 10,
      skip: 0,
      pageNumber: 1,
      fields: 'items(_id,_key,title,price),count'
    };
  }

  async load(openLoadingScreen , closeLoadingScreen){
    openLoadingScreen();
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      items: json.result.items
    });
    closeLoadingScreen();
  }

  async loadPage(openLoadingScreen, closeLoadingScreen){
    openLoadingScreen();
    const response = await fetch
      (`/api/v1/articles?limit=${this.getState().limit}&skip=${this.getState().skip}&fields=${this.getState().fields}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      size: json.result.count
    }) 
    closeLoadingScreen();
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

  setNewParametrs(pageNumber){
    this.setState({
      ...this.getState() ,
      pageNumber: pageNumber,
      skip: (pageNumber -1 )*10
    })
    console.log(this.getState())
  }
}

export default CatalogState;
