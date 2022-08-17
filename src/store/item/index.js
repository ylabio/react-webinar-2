import StateModule from "../module";

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
      isLoading: false,
    };
  }

  async loadOne(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      _id: json.result._id,
      title: json.result.title,
      description: json.result.description,
      edition: json.result.edition,
      price: json.result.price,
      country: `${json.result.maidIn.title} ${json.result.maidIn.code}`,
      category: json.result.category.title,
      isLoading: false,
    });
  }
}

export default CatalogState;
