import counter from "../../utils/counter";
import StateModule from "../module";

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
      currentPage: 1,
      totalPages: 0,
      limit: 10,
      totalItems: 0
    };
  }

  async load(page) {
    const { limit } = this.getState();
    const skip = limit * (page - 1);
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      currentPage: page,
      totalPages: Math.ceil(json.result.count / limit),
      totalItems: json.result.count
    });
  }

}

export default CatalogState;
