import { forEach } from "lodash";
import StateModule from "../module";

/**
 * Состояние товара
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      waiting: true,
    };
  }

  calculationLocationOfCategories(arr, parentCategory = null, depth = 0) {
    let newArr = arr.filter(i => parentCategory ? i.parent?._id === parentCategory : !i.parent)
                    .map(category => {
                      category.title = "- ".repeat(depth) + category.title;
                      return category;
                    })
                    .reduce((accumulator, currentValue) => {
                      const children = this.calculationLocationOfCategories(arr, currentValue._id, depth + 1)
                      accumulator.push(currentValue, ...children);
                      return accumulator;
                    }, []);
    return(newArr)
  }

  async load() {
    this.setState({
      items: [],
      waiting: true,
    });

    const response = await fetch(`/api/v1/categories?limit=*&fields=title,parent(title)`);
    const json = await response.json();
    this.setState({
      items: this.calculationLocationOfCategories(json.result.items),
      waiting: false
    })
  }
}

export default CategoriesState;
