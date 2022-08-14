import ModuleState from '../module';

/**
 * Состояние пагинации
 */
class PaginationState extends ModuleState {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      limit: 10,
      skip: 0,
      currentPage: 1
    };
  }

  /**
   * Установка текущей страницы
   * @param currentPage {number}
   */
  setCurrentPage(currentPage) {
    this.setState({
      ...this.getState(),
      currentPage,
      skip: (currentPage - 1) * this.getState().limit
    }, 'Установка текущей страницы');
  }

  /**
   * Установка limit
   * @param limit {number}
   */
  setLimit(limit) {
    this.setState({
      ...this.getState(),
      limit
    }, 'Установка limit');
  }
}

export default PaginationState;
