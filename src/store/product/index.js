import StateModule from "../module";

/**
 * Состояние страницы товара
 */
class ProductState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
    };
  }

  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      item: json.result,
    }, 'Загрузка товара');
  }
}

export default ProductState;