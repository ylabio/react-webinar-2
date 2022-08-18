import counter from '../../utils/counter';
import StateModule from '../module';

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
      currentPage: 1,
      amountPages: 0,
    };
  }

  async load(currentPage) {
    this.store.setState({ ...this.store.getState(), loading: true });

    const limit = this.store.getState().limit;
    const skip = (currentPage - 1) * limit;

    const response = await fetch(
      `/api/v1/articles?skip=${skip}&limit=${limit}&fields=items(*),count`
    );
    const json = await response.json();

    this.store.setState({ ...this.store.getState(), loading: false, skip });

    this.setState({
      ...this.store.getState().catalog,
      items: json.result.items,
      amountPages: Math.ceil(json.result.count / 10),
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

  setCurrentPage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }
}

export default CatalogState;
