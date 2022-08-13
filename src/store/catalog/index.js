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
      loading: true
    };
  }

  async load(page){
    this.setState({
      ...this.getState(),
      loading: true
    });
    const limit = 10
    if (page > 0) page--
    const response = await fetch(`/api/v1/articles?fields=items(*),count&limit=${limit}&skip=${limit * page}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: Math.round(json.result.count / limit),
      loading: false
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
