import counter from "../../utils/counter";
import StateModule from "../module";

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
      items: [],
      count: 0,
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(*),count');
    const json = await response.json();
    console.log(json)
    this.setState({
      items: json.result.items,
      count: json.result.count
    });
  }

  //http://example.front.ylab.io/api/v1/articles?limit=20&skip=10&fields=items(*),count

  async paginate(skip) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count
    });
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      items: this.getState().items.concat({ _id, title, price, selected }),
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id), skip
    },
      'Удаление товара');
  }
}

export default CatalogState;
