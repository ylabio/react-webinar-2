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

    const response = await fetch(
      `/api/v1/articles?skip=${(currentPage - 1) * 10}&fields=items(*),count`
    );
    const json = await response.json();

    this.store.setState({ ...this.store.getState(), loading: false });

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
