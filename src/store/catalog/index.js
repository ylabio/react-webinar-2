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
   * @param currentPage {number} Текущая страница
   * @param pageSize {number} Количество отображаемых товаров на странице
   */
  async load(currentPage, pageSize){
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count
    }, 'Загрузка порции данных с сервера для одной страницы');
  }

  /**
   * Изменение страницы каталога
   * @param pageNumber {number} Номер страницы
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
