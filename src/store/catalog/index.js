import StateModule from "../module";
import Api from "../../services/API";
import LocalStorage from "../../services/local-storage";
import skip from "../../utils/skip"

const service = new Api();
const localStorageService = new LocalStorage();

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
      current: localStorageService.getCurrentPage(),
      skip: localStorageService.getCurrentSkip(),
    };
  }

  changePage(page) {
    if (page) {
      const newSkip = skip(page, this.store.getState().catalog.limit);

      localStorageService.setCurrentPage(page);
      localStorageService.setCurrentSkip(newSkip);

      this.setState({
        ...this.store.getState().catalog,
        current: page,
        skip: newSkip,
      })
    }
  }

  async load(skip = 0, limit = 0) {
    const response = await service.getArticles(skip, limit);

    this.setState({
      ...this.store.getState().catalog,
      items: response.items,
      total: response.total,
    });
  }

  //http://example.front.ylab.io/api/v1/articles?limit=20&skip=10&fields=items(*),count

  async paginate(skip) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.store.getState().catalog,
      items: json.result.items,
      count: json.result.count
    });
  }
}

export default CatalogState;
