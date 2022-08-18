import StateModule from "../module";

/**
 * Состояние каталога
 */
class ArticleState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {}
    };
  }

  async loadById(_id){
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result
    });
  }

}

export default ArticleState;