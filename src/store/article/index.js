import StateModule from "../module";

const emptyState = {
  id: "",
  title: "",
  descripcion: "",
  price: 0,
  country: "",
  edition: 0,
  category: "",
};

class ArticleState extends StateModule {
  initState() {
    return emptyState;
  }

  async load(id) {
    // this.setState(emptyState);
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    const { result } = json;
    // console.log(json.result);
    this.setState({
      ...this.getState(),
      id: result ? result._id : "",
      title: result ? result.title : "",
      description: result ? result.description : "",
      price: result ? result.price : "",
      country: result ? result.maidIn.title : "",
      edition: result ? result.edition : "",
      category: result ? result.category.title : "",
    });
  }
}

export default ArticleState;
