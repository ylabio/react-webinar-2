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
      isLoading: false
    };
  }
  
  /**
   * Получение данных о товаре с api
   */
  
  async getProductInformation(id) {
    this.setState({
      ...this.getState(),
      id: null,
      title: null,
      description: null,
      country: null,
      category: null,
      year: null,
      price: null,
      isLoading: true
    })
    
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title),category(title)`);
    const {result} = await response.json();

    this.setState({
      ...this.getState(),
      id: id,
      title: result.title,
      description: result.description,
      country: result.maidIn.title,
      category: result.category.title,
      year: result.edition,
      price: result.price,
      isLoading: false
    })
  }
}

export default ProductState;
