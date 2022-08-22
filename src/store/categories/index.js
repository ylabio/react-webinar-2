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

  depth(item, arr, count) {
    let parentId, parent;
    // Рекурсия слишком дорогая (ограничил дальнейшее действие count'м)
    if(item.parent && count < 5) {
      parentId = item.parent._id;
      parent = arr.find(el => parentId == el._id);
      return this.depth(parent, arr, count + 1);
    }

    return count;
  }

  calculationLocationOfCategories(arr) {
    arr.forEach(item => {
      if(item.parent) {
        let count = this.depth(item, arr, 0);
        let i = 0;
        while (i < count) {
          item.title = "- " + item.title;
          i++;
        }

        let indexItem, indexParent;
        arr.forEach((itemTree, index) => {
          if (itemTree._id === item._id) {
            indexItem = index;
          }
          if (itemTree._id === item.parent._id) {
            indexParent = index;
          }
        });
        arr.splice(indexParent+1, 0, arr.splice(indexItem, 1)[0]);
      }
    })
    return(arr)
  }

  async load() {
    this.setState({
      items: [],
      waiting: true,
    });

    const response = await fetch(`/api/v1/categories?fields=title,parent(title)`);
    const json = await response.json();
    // console.log(json.result.items);
    this.setState({
      items: this.calculationLocationOfCategories(json.result.items),
      waiting: false
    })
  }
}

export default CategoriesState;
