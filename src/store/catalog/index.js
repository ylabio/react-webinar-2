import StateModule from "../module";
import Api from "../../services/API";

const service = new Api();

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
    };
  }

  async load(skip = 0, limit = 0) {
    const response = await service.getArticles(skip, limit);

    this.setState({
      items: response.items,
      total: response.total,
    });
  }

  //http://example.front.ylab.io/api/v1/articles?limit=20&skip=10&fields=items(*),count

  async paginate(skip) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count
    });
  }
}

export default CatalogState;
