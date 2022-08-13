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
      pageSize: 10,
      currentPage: 1
    };
  }

  /**
   * Загрузка порции данных с сервера для одной страницы
   */
  async load(){
    const response = await fetch(`/api/v1/articles?limit=${this.getState().pageSize}&skip=${(this.getState().currentPage - 1) * this.getState().pageSize}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count
    }, 'Загрузка порции данных с сервера для одной страницы');
  }

  /**
   * Изменение страницы каталога
   */
  async onPageChanged(pageNumber){
    this.setState({
      ...this.getState(),
      currentPage: pageNumber
    }, 'Изменение страницы каталога');
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
