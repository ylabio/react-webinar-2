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
      items: [],
      waiting: false,
    };
  }

  /**
   * Загрузка списка категорий
   */
  async load() {
    this.setState({
      items: [],
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/categories`);
      const json = await response.json();
      this.setState({
        items: json.result.items,
        waiting: false,
      });
    } catch (e) {
      this.setState({
        items: [],
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
