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
    };
  }

  async load(skip) {
    const response = await getArticles(skip);
    this.setState({
      items: response.result.items,
      count: response.result.count,
    });
  }

  async getItemById(id) {
    let item = this.store.getstate().catalog.items.find((item) => item._id === id);
    if (item) {
      return item;
    } else {
      const asyncItem = await this.getAsyncItemById(id).then((responce) => responce.result);
      this.setState({ items: [asyncItem], count: 0 });
      return asyncItem;
    }
  }

  async getAsyncItemById(id) {
    try {
      const responce = await getArticleById(id);
      return responce;
    } catch (e) {
      console.log(e);
    }
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
