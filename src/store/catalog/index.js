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
      totalCount: 0,
      pageSize: 10,
      currentPage: 0
    };
  }

  async load(limit, skip){
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    console.log(response)
    const json = await response.json();
    this.setState({
      items: json.result.items,
      totalCount: json.result.count
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

  changePage(page){
    this.setState({
      items,
      totalCount,
      pageSize,
      currnetPage: page
    }, 'Изменение номера страницы');
  }
}

export default CatalogState;
