import StateModule from "../module";

/**
 * Состояние продукта
 */
class ProductState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {}
    };
  }

  async load(id){
    const dataResponse = await fetch('/api/v1/articles/' + id);
    const dataJson = await dataResponse.json();

    const countryResponse = await fetch('/api/v1/countries/' + dataJson.result.maidIn._id);
    const countryJson = await countryResponse.json();

    const categoryResponse = await fetch('/api/v1/categories/' + dataJson.result.category._id);
    const categoryJson = await categoryResponse.json();

    this.setState({
      dataJson: dataJson.result,
      countryJson: countryJson.result,
      categoryJson: categoryJson.result
    });
  }
  
  /**
   * Очищает состояние
   */
   deleteItem() {
    this.setState({});
  }
}

export default ProductState;
