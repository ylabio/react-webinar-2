import StateModule from '../module';
import getPages from '../../utils/getPages';
import { findRelativeConfig } from '@babel/core/lib/config/files';

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
      limit: 10,
      skip: 0,
      currentPage: 1,
      pages: [],
      isLoading: false,
    };
  }

  /**
   * Получение записей с сервера
   * @param limit {number}
   * @param skip {number}
   */
  async load(limit, skip) {
    this.setLoading(true);
    const response = await fetch(
      `/api/v1/articles?lang=ru&limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        items: json.result.items,
        count: json.result.count,
      },
      'Получение записей с сервера'
    );
    this.setLoading(false);
  }

  /**
   * Установка пагинации
   * @param currentPage {number}
   */
  setPagination(currentPage) {
    this.setState(
      {
        ...this.getState(),
        currentPage,
        skip: (currentPage - 1) * this.getState().limit,
        pages: getPages(
          this.getState().count,
          this.getState().limit,
          currentPage
        ),
      },
      'Установка пагинации'
    );
  }

  /**
   * Установка начального массива страниц для пагинации
   */
  setInitialPages() {
    this.setState(
      {
        ...this.getState(),
        pages: getPages(
          this.getState().count,
          this.getState().limit,
          this.getState().currentPage
        ),
      },
      'Установка начального массива страниц для пагинации'
    );
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState(
      {
        ...this.getState(),
        items: this.getState().items.concat({ _id, title, price, selected }),
      },
      'Создание товара'
    );
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState(
      {
        ...this.getState(),
        items: this.getState().items.filter(item => item._id !== _id),
      },
      'Удаление товара'
    );
  }

  setLoading(flag) {
    this.setState({
      ...this.getState(),
      isLoading: flag,
    });
  }
}

export default CatalogState;
