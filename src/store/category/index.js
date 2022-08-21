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
    const response = await fetch('api/v1/categories');
    const json = await response.json();
    const items = json.result.items;
    console.log(items);
    const tree = {items: getTree(items)};
    this.setState(tree);
  }
}

export default CategoryState;
