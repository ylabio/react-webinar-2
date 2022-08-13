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
      totalPages: 1
    };
  }

  async load(page =1){
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(page - 1) * 10}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      currentPage: page,
      totalPages: Math.ceil(json.result.count / 10)
    });
  }

  setPage(page) {
    this.setState({
      ...this.state,
      currentPage: page
    })
  }
  
}

export default CatalogState;
