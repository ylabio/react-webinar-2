import StateModule from "../module";

/**
 * Состояние детальной информации об элементе
 */
class DetailsState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: [],
    };
  }

  async loadDetails(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({ item: json.result });
  }
}

export default DetailsState;
