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
      items: []
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      items: json.result.items
    });
  }

  async loadWithPagination(limit = 10) {
    const pagination = this.store.get('pagination');
    const skip = (this.store.getState().pagination.currentPage - 1) * limit;
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.json();
    const items = json.result.items;
    pagination.setTotalItems(json.result.count);

    this.setState(
      {
        items
      },
      'загрузка элементов с пагинацией из API'
    );
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState(
      {
        items: this.getState().items.concat({_id, title, price, selected})
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
        items: this.getState().items.filter(item => item._id !== _id)
      },
      'Удаление товара'
    );
  }
}

export default CatalogState;
