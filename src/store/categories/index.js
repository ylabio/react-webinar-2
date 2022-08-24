import StateModule from "../module";

/**
 * Состояние каталога
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: []
    };
  }

  /**
   * Загрузка категорий
   * @param params
   * @return {Promise<void>}
   */
  async loadCategories(){
    let categories = await fetch('/api/v1/categories').then(res => res.json());
    this.setState({
      ...this.getState(),
      categories: categories.result.items
    })
  }
}

export default CategoriesState;
