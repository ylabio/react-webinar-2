import StateModule from "../module";

class ProductState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      title: null,
      description: null,
      country: null,
      countryCode: null,
      category: null,
      edition: null,
      price: 0,
    };
  }

  async loadItem(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),
    category(title)`);
    const json = await response.json();
    this.setState({
      title: json.result.title,
      description: json.result.description,
      country: json.result.maidIn.title,
      countryCode: json.result.maidIn.code,
      category:json.result.category.title,
      edition: json.result.edition,
      price: json.result.price
    });
  }
}

export default ProductState;
