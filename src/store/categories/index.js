import StoreModule from "../module";


class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
      waiting: true
    };
  }

  async load() {
    try {
      const response = await fetch(`api/v1/categories?limit=*`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        categories: json.result.items,
        waiting: false
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        categories: null,
        waiting: false
      });
    }

  }
}
export default CategoriesStore;