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
      totalCount: null,
      isLoading: true
    };
  }

  async load(page=1) {
    this.setLoading(true)
    const pageNumber = (page * 10) - 10
    const response = await fetch(`/api/v1/articles?limit=10&skip=${pageNumber}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      totalCount: json.result.count,
      isLoading: false
    });
  }

  setLoading(isLoading) {
    this.setState({
      ...this.getState(),
      isLoading: isLoading
    })
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
