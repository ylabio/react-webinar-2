import StateModule from "../module";

/**
 * Список категорий
 */
class CategoryState extends StateModule{

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
   * Загрузка и создание вложенных категорий
   * @returns {Promise<void>}
   */
   async getCategories() {
    const response =  await fetch(`/api/v1/categories?limit=*`)
    const json = await response.json()

    const categories = {}
    // перебираем полученные категории, для каждой создаем свойство children и определяем в новый объект по ключу собственного ID
    // так будет удобнее добавлять подкатегории
    json.result.items.forEach((category) => categories[category._id] = {...category, children: []})

    const mainCategories = [{_id: 'all', title: 'Все'}]
    // если у категории есть родитель, добавляем ее к свойству children этого родителя, определенному ранее
    // главные категории не имеют родителей, добавляем их в итоговый массив mainCategories
    json.result.items.forEach((category) => {
      if (category.parent) {
        categories[category.parent._id].children.push(categories[category._id])
      } else {
        mainCategories.push(categories[category._id])
      }
    })

    this.setState({
      ...this.getState(),
      items: mainCategories
    })
  }
}

export default CategoryState;
