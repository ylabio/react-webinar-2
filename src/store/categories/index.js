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
    this.setState({
      data: json.result.items
    });
  }
}

export default CategoriesState; 