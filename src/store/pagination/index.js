import StateModule from "../module";
import skip from "../../utils/skip";

/**
 * Состояние пагинации
 */
class PaginationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      limit: 10,
      current: 1,
      skip: 0,
    };
  }

  changePage(page) {
    if (page) {
      const newSkipValue = skip(page, this.store.getState().pagination.limit);

      this.setState({
        ...this.store.getState().pagination,
        current: page,
        skip: newSkipValue,
      }, 'Изменение текущей страницы')
    }
  }
}

export default PaginationState;
