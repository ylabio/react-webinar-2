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

  async load(openLoadingScreen , closeLoadingScreen){
    openLoadingScreen();
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      items: json.result.items
    });
    closeLoadingScreen();
  }

  async loadPage(pageNumber , openLoadingScreen, closeLoadingScreen){
    openLoadingScreen();
    const response = await fetch
      (`/api/v1/articles?limit=10&skip=${(pageNumber - 1) * 10}&fields=items(_id,_key,title,price),count`);
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
}

export default CatalogState;
