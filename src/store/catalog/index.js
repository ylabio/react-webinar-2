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
      limit: 10,
      skip: 0,
      currPage: null,
      pages: null,
      loading: false,
    };
  }

  setPage(int) {
    if (int === this.getState().currPage) return;
    this.setState(
      {
        ...this.getState(),
        currPage: int,
      },
      'Изменения текущей страницы'
    );
  }

  calcSkip() {
    this.setState(
      {
        ...this.getState(),
        skip: (this.getState().currPage - 1) * this.getState().limit,
      },
      'calcSkip'
    );
  }

  clearArticles() {
    this.setState(
      {
        ...this.getState(),
        items: [],
      },
      'clearArticles'
    );
  }

  setParamsPage(page) {
    const parsedPage = parseInt(page);
    let realPage = Math.ceil(parsedPage);
    if (typeof parsedPage !== 'number' || parsedPage <= 0 || isNaN(realPage)) realPage = 1;
    const state = this.getState();
    this.setState(
      {
        ...state,
        currPage: realPage,
      },
      'Изменения текущей страницы из searchParams'
    );
    this.calcSkip();
  }

  setLoadLoading(bool) {
    this.setState({ ...this.getState(), loading: bool }, `Articles loading: ${bool}`);
  }

  async load() {
    const state = this.getState();
    this.clearArticles();
    this.setLoadLoading(true);

    const response = await fetch(
      `/api/v1/articles?limit=${state.limit}&skip=${state.skip}&fields=items(*),count`
    );
    const json = await response.json();
    const pages = Math.round(json.result.count / state.limit || 1);

    this.setState(
      {
        ...state,
        items: json.result.items,
        pages,
      },
      'Загрузка каталога'
    );

    if (state.currPage > pages) {
      this.setState({
        ...this.getState(),
        currPage: 1,
        skip: 0,
      }, 'Восстановление доступной страницы каталога')
    } else this.setLoadLoading(false);
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState(
      {
        ...this.getState(),
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
        ...this.getState(),
        items: this.getState().items.filter((item) => item._id !== _id),
      },
      'Удаление товара'
    );
  }
}

export default CatalogState;
