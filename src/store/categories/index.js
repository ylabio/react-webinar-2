import StateModule from '../module';

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
      categories: [],
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async fetchCategories() {
    const response = await fetch('api/v1/categories');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: json.result.items,
    });
  }
}

export default CategoriesState;
