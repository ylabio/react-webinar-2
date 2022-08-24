import StateModule from "../module";

/**
 * Состояние категорий
 */
 class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    };
  }

  // Загрузка категорий
  async initCategories() {
    this.setState({
      ...this.getState(),
      categories: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=items(*),parent&limit=*`);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        categories: json.result.items,
        waiting: false
      }, 'Загрузка категорий')
    } catch (e){
      this.setState({
        categories: [],
        waiting: false
      }, 'Ошибка');
    }
  }
}

export default CategoriesState;
