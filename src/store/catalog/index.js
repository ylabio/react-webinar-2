import counter from "../../utils/counter";
import StateModule from "../module";
import axios from "axios";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items:[],
      cuurentItem: {},
      lengthItems:0
    };
  }

  async getItems(nextList = 0, limit) {
    const result = await axios(`/api/v1/articles?limit=${limit}&skip=${nextList}&fields=items(*),count`);
    this.setState({
      items: result.data.result.items,
      lengthItems:result.data.result.count
    });
    localStorage.setItem('items',JSON.stringify(result.data.result.items))
   
  }
  isEmpty(obj) {
    for (var key in obj) {
      return true;
    }
    return false;
  }
  async getItemById(id) {

    const result = await axios(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
    const data = result.data.result
    this.setState({
      ...this.getState(),
      cuurentItem: { ...data }
    })
    
  }
  cuurentItemDefaultValue() {
    this.setState({
      ...this.getState(),
      cuurentItem: {}
    })
  }
  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      items: this.getState().items.concat({ _id, title, price, selected })
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
