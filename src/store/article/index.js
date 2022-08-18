import StateModule from '../module';

/**
 * Управление модальными окнами
 */
class ArticleState extends StateModule {
  initState() {
    return {
      _id: null,
      description: null,
      country: null,
      edition: null,
      title: null,
      price: null,
    };
  }

  async load(articleId) {
    this.store.setState({ ...this.store.getState(), loading: true });

    const articleResponse = await fetch(`/api/v1/articles/${articleId}`);
    const articleJson = await articleResponse.json();

    const countryId = articleJson.result.maidIn._id;
    const countryResponse = await fetch(`/api/v1/countries/${countryId}`);
    const countryJson = await countryResponse.json();
    const countryTitle = countryJson.result.title;

    const categoryId = articleJson.result.category._id;
    const categoryResponse = await fetch(`/api/v1/categories/${categoryId}`);
    const categoryJson = await categoryResponse.json();
    const categoryTitle = categoryJson.result.title;

    this.store.setState({ ...this.store.getState(), loading: false });

    this.setState({
      _id: articleJson.result._id,
      description: articleJson.result.description,
      edition: articleJson.result.edition,
      title: articleJson.result.title,
      price: articleJson.result.price,
      country: countryTitle,
      category: categoryTitle,
    });
  }
}

export default ArticleState;
