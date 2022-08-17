import StateModule from "../module";

/**
 * Управление страницей товара
 */
class PaginationStage extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      totalPages: null,
      activePage: 1
    };
  }

  async load(page) {
    const response = await fetch(`api/v1/articles?&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.store.state.paginationStage,
      totalPages: Math.ceil(json.result.count / 10)
    });
  }

  correctPage(id) {
    this.setState({
      ...this.store.state.paginationStage,
      activePage: id
    })
  }

}

export default PaginationStage;


