import StateModule from "../module";

/**
 * Состояние описания товара
 */
class CardState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {item: {}};
  }

  async getArticlesById(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({item: json.result});
    return json.result;
  }
}

export default CardState;