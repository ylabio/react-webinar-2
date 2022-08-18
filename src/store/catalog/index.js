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
      params: { //обернуто в объект для удобного сравнения
        page: 1,
        limit: 10,
      },

    };
  }

  async load(params = {}) {
    //проверка и бновление(если нужно) значения page
    const newParams = {...this.getState().params, ...params};
    this.setState({
      ...this.getState(),
      params: newParams,
    });

    const skip = (newParams.page - 1) * (newParams.limit);
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
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
