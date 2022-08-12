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
      current: 1,
      total: 1
    };
  }

  async load(page = 1){
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(page - 1) * 10}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      total: Math.ceil(json.result.count / 10),
      current: page
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

  setPage(page) {
    this.setState({
      ...this.getState(),
      current: page
    })
  }
}

export default CatalogState;
