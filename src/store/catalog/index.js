import StateModule from "../module";
import YLabService from "../../services/ylab-service";

const service = new YLabService();

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      total: null,
      isLoading: true,
      limit: 10,
      current: 1,
    };
  }

  async load(skip = 0, limit = 0){
    const response = await service.getArticles(skip, limit);

    this.setState({
      ...this.store.getState().catalog,
      items: response.items,
      total: response.total,
      isLoading: false,
    }, 'Загрузка каталога');
  }

  setLoadingTrue() {
    this.setState({
      ...this.store.getState().catalog,
      isLoading: true,
    }, 'Лоадер');
  }

  changePage(page) {
    if (page) {
      this.setState({
        ...this.store.getState().catalog,
        current: page,
      }, 'Изменение текущей страницы')
    }
  }
}

export default CatalogState;
