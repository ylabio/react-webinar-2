import counter from "../../utils/counter";
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
      item: {},
      category: {},
      maidIn: {}
    };
  }

  async getArticle(_id){
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    console.log(json);
    this.setState({
      item: json.result,
      category: json.result.category,
      maidIn: json.result.maidIn
    });
  }
}

export default ProductState;
