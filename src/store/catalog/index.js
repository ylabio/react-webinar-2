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
      itemsQty: 0,
      pagSel: 1,
      limit: 10
    };
  }

  /**
   * Загрузка данных о товарах из каталога
   * @param pagSel {number}
   */
  async load(pagSel) {
    const response = await fetch('/api/v1/articles?limit=' + this.getState().limit +
      '&skip=' + ((pagSel - 1) * 10) + '&fields=items(*),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      itemsQty: json.result.count,
      pagSel: pagSel
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
