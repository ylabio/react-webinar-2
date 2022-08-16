import ModuleState from '../module';
import paginate from '../../utils/paginate';

/**
 * Состояние каталога
 */
class CatalogState extends ModuleState {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      count: 0,
      limit: 10,
      skip: 0,
      currentPage: 1,
      pages: []
    };
  }

  /**
   * Получение записей с сервера
   * @param limit {number}
   * @param skip {number}
   */
  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count
    }, 'Получение записей с сервера');
  }

  /**
   * Установка пагинации
   * @param currentPage {number}
   */
  setPagination(currentPage) {
    this.setState({
      ...this.getState(),
      currentPage,
      skip: (currentPage - 1) * this.getState().limit,
      pages: paginate(this.getState().count, this.getState().limit, currentPage)
    }, 'Установка пагинации');
  }

  /**
   * Установка начального массива страниц для пагинации
   */
  setInitialPages() {
    this.setState({
      ...this.getState(),
      pages: paginate(this.getState().count, this.getState().limit, this.getState().currentPage)
    }, 'Установка начального массива страниц для пагинации');
  }

  /**
   * Установка limit
   * @param limit {number}
   */
  setLimit(limit) {
    this.setState({
      ...this.getState(),
      limit
    }, 'Установка limit');
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState({
      ...this.getState(),
      items: this.getState().items.concat({ _id, title, price, selected })
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      ...this.getState(),
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;
