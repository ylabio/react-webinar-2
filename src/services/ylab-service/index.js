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

  _transformArticlePartial(article) {
    return {
      id: article._id,
      title: article.title,
      price: article.price,
    };
  }
}
