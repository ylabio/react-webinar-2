import StateModule from "../module";

class ArticleState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      _id: 0,
      title: '',
      description: '',
      maidIn: {},
      edition: 0,
      category: {},
      price: 0
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    console.log(json)
    this.setState({
      _id: json.result._id,
      title: json.result.title,
      description: json.result.description,
      maidIn: json.result.maidIn,
      edition: json.result.edition,
      category: json.result.category,
      price: json.result.price
    });
  }

  clean() {
    this.setState({
      _id: 0,
      title: '',
      description: '',
      maidIn: {},
      edition: 0,
      category: {},
      price: 0
    })
  }
}

export default ArticleState;