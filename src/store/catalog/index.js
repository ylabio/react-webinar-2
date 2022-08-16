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
      loading: true,
      pageSize: 10,
      numOfPages: 0,
      activePage: 1
    };
  }

  async load(page){
    this.setState({
      ...this.getState(),
      activePage: page,
      loading: true
    });
    const limit = this.getState().pageSize;
    if (page === 1) page--;

    const response = await fetch(`/api/v1/articles?fields=items(*),count&limit=${limit}&skip=${limit * page}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      numOfPages: Math.floor((json.result.count) / limit),
      loading: false
    });
  }
  /* Сброс элемента */
  reset() {
    this.setState({ ...this.getState(), loading: true, activePage: 1 })
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
