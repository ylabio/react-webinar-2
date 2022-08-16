import counter from "../../utils/counter";
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
      currArticle: {},
			isLoading: false
    };
  }

  async fetchCurrArticle(id){
		this.setIsLoading(true);
		const resp = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
		const { result } = await resp.json();
    this.setState({
			...this.store.state.article,
			currArticle: {...result},
			isLoading: false
    });
  }

	setIsLoading(flag){
		this.setState({
			...this.store.state.article,
			isLoading: flag
    });
	}
}

export default ArticleState;
