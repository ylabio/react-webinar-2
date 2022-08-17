import StateModule from "../module";

/**
 * Состояние каталога
 */
class ProductState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      product: {}
    };
  }

  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?lang=all&fields=maidIn(title,code),category(title),edition,price,title,description`);
    const json = await response.json();
    this.setState({
      product: json.result
    });
  }
}

export default ProductState;
