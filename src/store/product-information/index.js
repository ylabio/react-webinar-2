import StateModule from "../module";

/**
 * Состояние страницы информации о товаре
 */
class ProductState extends StateModule {
  
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      id: '',
      title: '',
      description: '',
      country: '',
      category: '',
      year: 0,
      price: 0,
    };
  }
  
  /**
   * Получение данных о товаре с api
   */
  
  async getProductInformation(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const {result} = await response.json();
    this.setState({
      ...this.getState(),
      id: id,
      title: result.title,
      description: result.description,
      country: result.maidIn._id,
      category: result.category._id,
      year: result.edition,
      price: result.price,
    })
  }
}

export default ProductState;
