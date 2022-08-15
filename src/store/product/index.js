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
      isLoading: true
    };
  }

  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
  
    if (!json.result) {
      console.error(`В JSON файле ошибка`)
      this.setState({
        item: {},
        isLoading: false
      })
    } else {
      this.setState({
          ...this.getState(),
          item: json.result,
          isLoading: false
      }, 'Загрузка товара');
    }
  }

  resetLoader() {
    this.setState({
      ...this.getState(),
      isLoading: true
    }, 'Выход из товара');
  }
}

export default ProductState;