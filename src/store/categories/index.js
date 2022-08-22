import { createCategoriesFromTree } from "../../utils/create-categories-from-tree";
import { createCategoryTree } from "../../utils/create-categoty-tree";
import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class CaregoriesState extends StateModule{

  initState() {
    return {
      categories: [],
      isFetching: false,
    };
  }

  async getCategories() {
    this.setState({
      ...this.getState(),
      isFetching: true,
    });
    const response = await (await fetch('/api/v1/categories')).json()
    const categoriesTree = createCategoryTree(response.result.items);
    const categories = createCategoriesFromTree(categoriesTree);
    categories.unshift({value: 'all', title: 'Все'});
    this.setState({
      categories,
      isFetching: false,
    });
  }
}

export default CaregoriesState;
