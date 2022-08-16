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
      item: {},
      loading: false,
      error: "",
    };
  }

  async loadDetails(id) {
    try {
      this.setState({ ...this.store.state.details, loading: true });
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();

      this.setState({
        ...this.store.state.details,
        item: json.result,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.store.state.details,
        loading: false,
        error: e.message,
      });
    }
  }
}

export default DetailsState;
