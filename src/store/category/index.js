import StateModule from "../module";
import { createTree } from "../../utils/createTree";
import { createCategoryList } from "../../utils/createCategoryList";

/**
 * Состояние списка категорий товаров
 */
class CategoryState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryList: [],
    };
  }

  /**
   * Получить все категории
   * @return {Promise<void>}
   */
  async getCategories() {
    const response = await fetch('api/v1/categories?lang=ru&limit=*&skip=0&fields=%2A');
    const json = await response.json();
    const items = json.result.items;

    const tree = createTree(items);

    const categoryList = createCategoryList(tree)

    // Установка полученных данных
    this.setState({
      ...this.getState(),
      categoryList: [{ title: 'Все', value: '' }, ...categoryList]
    });
  }
}

export default CategoryState;
