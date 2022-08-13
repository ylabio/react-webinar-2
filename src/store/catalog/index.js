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
      query: {
        page: 1,
        limit: 10,

      }
    };
  }

  async load(query={}){
    const newQuery = {...this.getState().query, ...query};
    this.setState({
      ...this.getState(),
      query: newQuery
    });
    const skip = (newQuery.page - 1) * (newQuery.limit);

    const response = await  fetch(`/api/v1/articles?limit=${newQuery.limit}&skip=${skip}&fields=items(*),count`)
    const json = await response.json()
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
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
