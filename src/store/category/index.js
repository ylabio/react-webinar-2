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

  /**
   * Загружает и фильтрует категории из API.
   */
  async load() {
    const response = await fetch("api/v1/categories?lang=ru&&skip=0&fields=title,_id,parent&sort=parent")
    const json = await response.json()
    const categories = json["result"]["items"]
    const newCategories = []
    // Результат из апи заносим в массив
    for (let category of categories) {
      newCategories.push({value: category._id, title: category.title, parent: category.parent?._id, children: 0})
    }
    // Находим родительские связи и добавляем черточку
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
        parentIdx = newCategoriesSorted.findIndex(cat => cat.value === category.parent) // Находим самого первого родителя
        newCategoriesSorted[parentIdx].children++ // Накапливаем детей, чтобы знать, сколько удалять во время сортировки
        const catToDel = newCategoriesSorted.findIndex(cat => cat.value === category.value)  // Ищем индекс категории, которую будем перемещать
        let deleted = newCategoriesSorted.splice(catToDel, 1+newCategoriesSorted[catToDel].children) // Удаляем ее и уже отсорт детей.
        newCategoriesSorted.splice(parentIdx+1, 0, ...deleted) // Вставлем категорию + детей из массива удаленных
      }
    }
    this.setState({items: newCategoriesSorted})
  }
}

export default CategoriesState;
