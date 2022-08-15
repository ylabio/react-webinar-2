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
    // Запрос товара
    const itemResponse = await fetch(`/api/v1/articles/${id}`);
    const {result} = await itemResponse.json();
    
    // Запрос страны
    const countryResponse = await fetch(`/api/v1/countries/${result.maidIn._id}`);
    const country = await countryResponse.json();
    
    // Запрос категории
    const categoryResponse = await fetch(`/api/v1/categories/${result.category._id}`);
    const category = await categoryResponse.json();

    this.setState({
      ...this.getState(),
      id: id,
      title: result.title,
      description: result.description,
      country: country.result.title,
      category: category.result.title,
      year: result.edition,
      price: result.price,
      isLoading: false
    })
  }
}

export default ProductState;
