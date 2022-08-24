import getHierarchyItems from "../../utils/hierarchy-items";
import StateModule from "../module";

/**
 * Состояние категорий товаров
 */
class CategoriesState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: []
    };
  }

  /**
   * Загрузка списка категорий товаров
   */
  async load() {
    const response = await fetch('/api/v1/categories?limit=*');
    const json = await response.json();
    const categories = json.result.items.map(category => {
      return { title: category.title, value: category._id, parent: category.parent?._id }
    });

    // Выстраивание иерархии категорий
    // Решение взято из ресурса stackoverflow (https://stackoverflow.com/questions/71387294/create-a-hierarchy-list-from-an-json-based-on-some-key-values-javascript)
    const result = Array.from(
      categories.reduce((acc, o) => {
        const { parent: id, title: title } = o

        if (!acc.has(id)) acc.set(id, { id, title })

        const parent = acc.get(id)

        parent.children ??= []

        if (!acc.has(o.value)) acc.set(o.value, o)
        else Object.assign(acc.get(o.value), o)

        parent.children.push(acc.get(o.value))

        return acc
      }, new Map()).values()
    ).filter(o => !o.hasOwnProperty('parent'))

    // Преобразование в одномерный массив
    const hierarchy = getHierarchyItems(result[0].children)

    this.setState({
      data: hierarchy
    });
  }
}

export default CategoriesState; 