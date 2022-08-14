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
      count: 0,
      limit: 10,
    };
  }

  async load({ limit = 10, skip = 0 }) {
    const response = await fetch(
      // `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
      `/api/v1/articles?lang=ru&limit=10&skip=0&fields=%2A`

    );
    const json = await response.json();
  
    this.setState({    
      items: json.result.items,
      count: json.result.count,
    });
  }



  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState(
      {
        items: this.getState().items.concat({ _id, title, price, selected }),
        count: 0,
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
        items: this.getState().items.filter(item => item._id !== _id),
        count: count,
      },
      'Удаление товара'
    );
  }
}

export default CatalogState;
