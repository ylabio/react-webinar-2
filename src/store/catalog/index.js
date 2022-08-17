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
      totalCount: 0,
    };
  }

  async load(limit, skip){
    const response = await fetch(`/api/v1/articles?lang=ru&limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      totalCount: json.result.count,
    });
  }

  setItem(item) {
    this.setState({
      items: [item],
      totalCount: 1,
    })
  }
}

export default CatalogState;
