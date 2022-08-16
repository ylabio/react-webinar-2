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
      page: 1,
      itemsCount: 0,
      pagesCount: 0,
      pageLimit: 10
    };
  }

  async load(page, limit) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${limit * (page - 1)}&fields=items(*),count&lang=ru`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      itemsCount: json.result.count,
      pagesCount: Math.ceil(json.result.count / this.getState().pageLimit)
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState(
      {
        ...this.getState(),
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
        ...this.getState(),
        items: this.getState().items.filter(item => item._id !== _id)
      },
      'Удаление товара'
    );
  }
  /**
   * Установка страницы
   * @param page
   */
  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        page
      },
      'Установка страницы'
    );
  }
}

export default CatalogState;
