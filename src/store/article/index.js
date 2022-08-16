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
      item: null,
      loading: true,
      baseUrlArticle: '/article'
    };
  }

  /* Загрузка элемента */
  async load(_id){
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result,
      loading: false,
    });
  }

  /* Сброс элемента */
  reset() {
    this.setState({ ...this.getState(), loading: true, item: null })
  }

}

export default ArticleState;
