import StateModule from "../module";

/**
 * Состояние корзины
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
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    this.setState({ item: json.result });
  }
}

export default DetailsState;
