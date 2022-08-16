import StateModule from "../module";

/**
 * Состояние страницы товара
 */
class ProductState extends StateModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      description: null,
    }
  }

  async load(id) {
    const url = `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title,code)`;
    const response = await fetch(url);
    if (response.status >= 200 && response.status < 300) {
      const {result} = await response.json();
      this.setState({
        ...this.getState(),
        description: result,
      });
    return false;
    }          
  }

  // isLoading(value) {
  //   this.setState({
  //     ...this.getState(),
  //     loading: value,
  //   });
  // }
}



export default ProductState;