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
      newCategories.push({value: category._id, title: category.title, parent: category.parent?._id})
    }
    // Находим родительские связи и добавляем черточку
    for (let category of newCategories) {
      let parent = category.parent
      while(parent) {
        category.title = ' - '+category.title
        parent = newCategories.find(category => category.value === parent).parent
      }
    }
    // Сортируем массив, чтобы он выглядел правильно со стороны иерархии
    for (let idx = 0; idx < newCategories.length; idx ++) {
      if(newCategories[idx].parent) {
        const parentIdx = newCategories.findIndex((cat) => cat.value === newCategories[idx].parent)
        newCategories.splice(parentIdx+1, 0, newCategories[idx])
        newCategories.splice(idx+1, 1)
      }
    }
    this.setState({items: newCategories})
  }
}

export default CategoriesState;
