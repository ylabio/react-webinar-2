import StateModule from "../module";

class CategoriesState extends StateModule {

  initState() {
    return {
      categories: [],
    };
  }

  async loadCategories() {
    const categoriesResponse = await fetch(`/api/v1/categories`);
    const categories = await categoriesResponse.json();

    this.setState({
      categories: categories.result.items
    });
  }
}

export default CategoriesState;
