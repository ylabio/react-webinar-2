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
    let result;

    try {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    result = json.result
    } catch (error) {
      console.error(error);
    }
    
    this.setState({
      ...this.getState(),
      item: result,
    }, 'Загрузка товара');
  }
}

export default ProductState;