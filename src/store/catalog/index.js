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
      totalPage: null,
      page: 0,
      pageSize: 8
    };
  }

  async load(page){
    const pageSize = this.getState().pageSize
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${pageSize*page}&lang=ru&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      totalPage: Math.ceil(json.result.count / this.getState().pageSize),
      page: page+1
    });
  }

}

export default CatalogState;
