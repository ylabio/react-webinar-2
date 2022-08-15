import StateModule from "../module";

/**
 * Состояние страницы товара
 */
class CartState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: null,
      isLoading: true,
    };
  }

  /**
   * запрос каталога с страницами
   * @param id
   */
  async loadProduct(id) {
    this.setState({...this.getState(), isLoading: true})
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    console.log(response)
    if (response.status === 200) {
      const json = await response.json();
      this.setState({
        ...this.getState(),
        item: json.result,
        isLoading: false,
      }, 'Запрос страницы товара');
    } else {
      this.setState({
        ...this.getState(),
        isLoading: false,
      })
    }
  }
}

export default CartState;
