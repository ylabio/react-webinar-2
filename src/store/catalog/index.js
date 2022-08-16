import counter from '../../utils/counter';
import StateModule from '../module';
import axios from 'axios';
import { getPagesCount } from '../../utils/get-pages';

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
      pages: 0,
      limit: 10,
      skip: 0,
    };
  }

  async load() {
    const limit = this.getState().limit;
    const skip = this.getState().skip;
    const response = await axios.get(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.data;

    this.setState({
      items: json.result.items,
      pages: getPagesCount(json.result.count, limit),
      limit,
      skip,
    });
  }

  getCurrentPage() {
    const limit = this.getState().limit;
    const skip = this.getState().skip;
    const currentPage = (skip + limit) / limit;
    return currentPage;
  }

  async changePage(page) {
    // this.store.getState().loader.setLoadingTrue();
    let skip = 0;
    const pages = this.getState().pages;
    const limit = this.getState().limit;
    skip += page * limit - limit;
    const response = await axios.get(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.data;

    this.setState({
      items: json.result.items,
      pages,
      limit,
      skip,
    });
    // this.store.getState().loader.setLoadingFalse();
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState(
      {
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
        items: this.getState().items.filter((item) => item._id !== _id),
      },
      'Удаление товара'
    );
  }
}

export default CatalogState;
