import StateModule from '../module';

/**
 * Список категорий
 */
class CategoryState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
   initState() {
    return {
      allCategories: [],
    };
  }

  async initParams(_params = {}) {
    await this.loadAllCategories();
  }

  async loadAllCategories() {
    const response = await fetch(`/api/v1/categories?fields=items(*),parent&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      allCategories: json.result.items,
    });
  }
}

export default CategoryState;
