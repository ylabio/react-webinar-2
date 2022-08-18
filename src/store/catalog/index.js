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
      count:0,
      limit:10,
      currentPage:1,
    };
  }



  async load(skip){

    const response = await fetch(`/api/v1/articles`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
    });

  }
  async switchPage(limit=10) {
    const skip = (this.getState().currentPage - 1) * limit;
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count:json.result.count,
      currentPage:this.getState().currentPage
    });
  }
  setPageNumber(page) {
    this.setState(
        {
          ...this.getState(),
          currentPage: page,
        },
    );
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
