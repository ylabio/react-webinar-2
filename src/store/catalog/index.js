import StateModule from '../module';
import { getArticleById, getArticles } from '../../utils/axios/requests';

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
      activePage: 1,
    };
  }

  async load(skip) {
    const catalog = this.store.getState().catalog;
    const response = await getArticles(skip);
    this.setState({
      ...catalog,
      items: response.result.items,
      count: response.result.count,
    });
  }

  setActivePage(page) {
    const catalog = this.store.getState().catalog;
    this.setState({
      ...catalog,
      activePage: page,
    });
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
