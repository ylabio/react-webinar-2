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
      limit: 10,
      skip: 0,
      selected: 1
    };
  }

  async load(){
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${this.getState().skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(), 
      items: json.result.items,
      count: json.result.count
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

  /**
   * Смещение выборки и пагинация
   * @param object
   */
  setSkip({skip, selected}) {
    this.setState({
      ...this.getState(), 
      skip: skip,
      selected: selected,
    }, 'Смещение выборки и пагинация');
  }
}

export default CatalogState;
