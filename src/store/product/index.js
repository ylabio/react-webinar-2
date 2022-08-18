import StateModule from "../module";

class ProductState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
    };
  }

  async loadItem(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),
    category(title)`);
    const json = await response.json();
    this.setState({
      item: {
        title: json.result.title,
        description: json.result.description,
        country: json.result.maidIn.title,
        countryCode: json.result.maidIn.code,
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price,
      },
    });
  }
}

export default ProductState;
