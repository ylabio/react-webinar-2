import StateModule from "../module";

/**
 * Состояние категорий
 */
class CategoriesState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      allcategories: [],
      waiting: false
    };
  }

    async getCategories() {
    const categoryResponse = await fetch('api/v1/categories?lang=ru&sort=parent&skip=0&fields=%2A')
    const categoryJson = await categoryResponse.json();
    const result = categoryJson.result.items;
      // Рекурсия для изменения наименования товара по его вложенности
    const getIndetNum = (arr, elem, iter = 0) => {
    const parent = elem.parent;
        while (parent) {
          const ansestor = arr.find(el => el._id === parent._id);
          return getIndetNum(arr, ansestor, iter += 1)
        }
        return iter;
    }
    // сортировка с изменение индекса в масиве сразу за родителем или родителелм родителя и т.д.
    const sortByParentId = (arr) => arr.forEach((el, index )=> {
    const parentIndex = arr.findIndex(item => item.value === el.parent);
 
    if (parentIndex !== -1) {
        arr.splice(index, 1)
        arr.splice(parentIndex + 1, 0, el)  
        }
    });

    const indentedCategories = result.map((elem) => {
        const { _id, title } = elem;
        const indentNum = getIndetNum(result, elem);
        return { ...elem, value: _id, title: '-'.repeat(indentNum) + ' ' + title, parent: elem.parent ? elem.parent._id : undefined }
      })
    // думаю можно было совместить в одной функции, но это понизило бы читаемость рекурсивного кода
    sortByParentId(indentedCategories)

    this.setState({
      allcategories: indentedCategories,
      waiting: false,
    });
    }
}

export default CategoriesState;
