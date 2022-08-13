import counter from "../../utils/counter";
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
      article: {},
      isLoading: false,
    };
  }

  async load(id) {
    this.setState({
      article: {},
      isLoading: false,
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();
      this.setState({
        article: json.result,
        isLoading: true,
      });
    } catch (e) {
      console.error(e.message);
      this.setState({
        article: {},
        isLoading: true,
      });
    }
  }
}

export default ArticleState;
