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

  // nestingLevel(item, arr, count = 0) {
  //   console.log(item)
  //   if(item.parent) {
  //     let parentId = item.parent._id;
  //     let parent = arr.find(el => el._id == parentId)
  //     return this.nestingLevel(parent, arr, count + 1)
  //   }
  //   return count;
  // }

  sortByRootId(otherArr, arr) {
    // let tempArr = [];
    // arr.forEach(item => {
    //   if(item.parent && treeRootId == item.parent._id) {
    //     console.log("Есть");
    //   }
    // })
    arr.forEach(item => {
      arr.forEach(el => {

      })
    })

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
    // let treeRootId = "";
    // let parentsRoot = [];
    // let sortArr = [];
    // let iterator = 1;
    arr.forEach(item => {
      if(item.parent) {
        let count = this.depth(item, arr, 0);
        let i = 0;
        while (i < count) {
          item.title = "-" + item.title;
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

    // console.log(parentsRoot)
    // // sortArr = parentsRoot;
    // parentsRoot.forEach((item, i) => {
    //   arr.forEach((el, j) => {
    //     if(el.parent && item._id === el.parent._id) {
    //       sortArr.splice(i + j, 0, el);
    //     }
    //   })
    // })

    // arr.forEach(item => {
    //   if(!item.parent) {
    //     // treeRootId = item._id;
    //     otherArr.push(item);
    //     console.log(treeRootId)
    //     // otherArr.push(item);
    //   }
    // })

    // this.sortByRootId(otherArr, arr);

    // const sortedArrByParent = arr.reduce((accumulator, currentValue) => {
    //   let item = accumulator.find(x => x.id === currentValue.parent._id);
    //   let index = accumulator.indexOf(item);
    //   index = index !== -1 ? index + 1 : accumulator.length;
    //   accumulator.splice(index, 0, currentValue);
    //   return accumulator;
    // }, []);
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
