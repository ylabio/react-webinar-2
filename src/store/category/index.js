import StateModule from "../module";
import {getTree} from "../../utils/get-tree";

/**
 * Состояние товара
 */
class CategoryState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
    };
  }

  async getCategory(){
    const response = await fetch('api/v1/categories?lang=ru&limit=15&skip=0');
    const json = await response.json();
    const items = json.result.items;
    const tree = {items: getTree(items)};
    this.setState(tree);
  }
}

export default CategoryState;
