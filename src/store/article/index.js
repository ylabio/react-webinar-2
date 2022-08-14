import Api from "../../API";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class ArticleState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
      category: {},
      country: {},
    };
  }

  async loadArticle(id) {
    try {
      const response = await Api.getArticleById(id);
      this.setState({
        item: response,
        category: response.category,
        country: response.maidIn,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default ArticleState;
