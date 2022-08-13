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
      totalPagesCounter: 0,
      currentPage: 0,
      pageSkip: 0,
      itemLimit: 10,
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?skip=${this.getState().pageSkip}&limit=${this.getState().itemLimit}&fields=items(*),count`
    );
    const json = await response.json();
    const result = json.result;

    this.setState({
      items: json.result.items,
      count: json.result.count,
      totalPagesCounter:
        this.getState().totalPagesCounter === 0 ? Math.round(result.count / 10) : this.getState().totalPagesCounter,
      currentPage: this.getState().currentPage === 0 ? (result.count > 1 ? 1 : 0) : this.getState().currentPage,
      pageSkip: this.getState().pageSkip,
    });
  }

  /**
   * Обновление
   */
  updateState() {
    this.setState({
      items: this.getState().items,
      count: this.getState().count,
      totalPagesCounter: this.getState().totalPagesCounter,
      currentPage: this.getState().currentPage,
      pageSkip: this.getState().currentPage * 10 - 10,
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

  /**
   * Смена страницы
   */
  setPage(page) {
    this.setState({
      items: this.getState().items,
      count: this.getState().count,
      totalPagesCounter: this.getState().totalPagesCounter,
      currentPage: page,
      pageSkip: this.getState().currentPage * 10,
    });
    this.updateState();
    this.load();
  }
}

export default CatalogState;
