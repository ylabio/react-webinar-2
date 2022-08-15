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
    };
  }

  async load( limit, skip ) {
    const response = await fetch(
      `/api/v1/articles?lang=ru&limit=${limit}&skip=${skip}&fields=items(*),count`
    );
    const json = await response.json();
  
    this.setState({    
      items: json.result.items,
      count: json.result.count,
    }, 'Получение данных с сервера');
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
