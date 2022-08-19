import StateModule from "../module";

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
      isLoading: true,
      page: 1,
      contentPerPage: 10,
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      items: json.result.items
    });
  }

  /**
   * сохранение страницы
   * @param page
   */

  setPage(page) {

    this.setState({
      ...this.getState(),
      page
    });
  }

  /**
   * сохранение количества записей
   * @param contentPerPage
   */

  setContentPerPage(contentPerPage) {

    this.setState({
      ...this.getState(),
      contentPerPage
    });
  }

  /**
   * запрос каталога с страницами
   * @param skip
   */
  async loadProducts(skip) {
    this.setState({...this.getState(), isLoading: true})
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      isLoading: false,
    }, 'Запрос страницы товара');
  }


  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;
