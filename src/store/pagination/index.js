import StateModule from "../module";
import skip from "../../utils/skip";
import LocalStorage from "../../services/local-storage";

const localStorageService =  new LocalStorage();

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
      current: localStorageService.getCurrentPage(),
      skip: localStorageService.getCurrentSkip(),
    };
  }

  changePage(page) {
    if (page) {
      const newSkipValue = skip(page, this.store.getState().pagination.limit);

      localStorageService.setCurrentPage(page);
      localStorageService.setCurrentSkip(newSkipValue);

      this.setState({
        ...this.store.getState().pagination,
        current: page,
        skip: newSkipValue,
      }, 'Изменение текущей страницы')
    }
  }
}

export default PaginationState;
