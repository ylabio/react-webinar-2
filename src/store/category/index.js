import StateModule from "../module";

/**
 * Состояние списка категорий
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: []
    };
  }

  
  async load() {
    const response = await fetch("api/v1/categories?lang=ru&&skip=0&fields=title,_id,parent&sort=parent")
    const json = await response.json()
    const categories = json["result"]["items"]
    const newCategories = []

    // Результат вывод апи в массиве
    for (let category of categories) {
      newCategories.push({value: category._id, title: category.title, parent: category.parent?._id, children: 0})
    }


    // создание иерархии
    let newCategoriesSorted = [...newCategories]
    for (let category of newCategories) {
      let parentIdx = newCategories.findIndex(cat => cat.value === category.parent)
      let hasParent
      parentIdx !== -1 ? hasParent = true : hasParent = false
      while(parentIdx !== -1) {
        category.title = ' - '+category.title
        parentIdx = newCategories.findIndex(category => category.value === newCategories[parentIdx].parent)
      }
      if (hasParent) {
        // поиск родителя
        parentIdx = newCategoriesSorted.findIndex(cat => cat.value === category.parent) 
        // ищем детей чтобы знать сколько нужно уделить сортировке
        newCategoriesSorted[parentIdx].children++ 
        
        const catToDel = newCategoriesSorted.findIndex(cat => cat.value === category.value)  
        
        let deleted = newCategoriesSorted.splice(catToDel, 1+newCategoriesSorted[catToDel].children) 
        

        newCategoriesSorted.splice(parentIdx+1, 0, ...deleted) 
      }
    }
    this.setState({items: newCategoriesSorted})
  }
}

export default CategoriesState;
