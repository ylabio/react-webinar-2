export default class YLabService {
  _apiBase = `/api/v1`;

  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    return await response.json();
  }

  async getArticles(skip = 0, limit = 0) {
    const response = await this.getResource(`/articles/?limit=${limit}&skip=${skip}&fields=items(*),count`);

    return {
      items: response.result.items.map(this._transformArticlePartial),
      total: response.result.count
    }
  }

  async getArticle(id) {
    const response = await this.getResource(`/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    return this._transformArticleFull(response.result);
  }

  _transformArticlePartial(article) {
    return {
      id: article._id,
      title: article.title,
      price: article.price,
    };
  }

  _transformArticleFull(article) {
    return {
      id: article._id,
      title: article.title,
      description: article.description,
      country: article.maidIn.title,
      countryCode: article.maidIn.code,
      category: article.category.title,
      editionYear: article.edition,
      price: article.price,
    };
  }
}
