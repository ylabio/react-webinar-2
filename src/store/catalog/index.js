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
      itemsCount: 1,
      currentPage: 1,
      selectItem: {},
      country: '',
      category: '',
    };
  }

  async load(skip) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${skip}&fields=items%28%2A%29%2C%20count`,
    );
    const json = await response.json();
    this.setState({
      items: json.result.items,
      itemsCount: json.result.count,
      currentPage: this.getState().currentPage,
      selectItem: this.getState().selectItem,
      country: this.getState().country,
      category: this.getState().category,
    });
  }

  async loadItem(_id) {
    const response = await fetch(`/api/v1/articles/${_id}`);
    const json = await response.json();
    const response2 = await fetch(`/api/v1/categories/${json.result.category._id}`);
    const json2 = await response2.json();
    const response3 = await fetch(`/api/v1//countries/${json.result.maidIn._id}`);
    const json3 = await response3.json();

    this.setState({
      items: this.getState().items,
      itemsCount: this.getState().itemsCount,
      currentPage: this.getState().currentPage,
      selectItem: json.result,
      category: json2.result,
      country: json3.result,
    });
  }

  setCurrentPage(page) {
    this.setState({
      items: this.getState().items,
      itemsCount: this.getState().itemsCount,
      currentPage: page,
      selectItem: this.getState().selectItem,
      country: this.getState().country,
      category: this.getState().category,
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
      'Создание товара',
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
      'Удаление товара',
    );
  }
}

export default CatalogState;
