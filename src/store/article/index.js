import StateModule from '../module';

class ArticleState extends StateModule {
  initState() {
    return {
      data: null,
      loading: false,
    };
  }

  clearArticle() {
    this.setState(
      {
        ...this.getState(),
        data: null,
      },
      'Очистка текущего товара'
    );
  }

  setArticleLoading(bool) {
    this.setState({ ...this.getState(), loading: bool }, `Состояние загрузки товара: (${bool})`);
  }

  async loadArticle(id) {
    this.setArticleLoading(true);
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      data: json.result,
    },'Загрузка товара');
    this.setArticleLoading(false);
  }
}

export default ArticleState;
