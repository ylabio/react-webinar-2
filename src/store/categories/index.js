import StateModule from "../module";
import getCategories from "../../utils/categories";

/**
 * Состояние
 */
class CategoriesState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
      error: null
    };
  }

  /**
   * Загрузка
   */
  async load() {
    // установка признака ожидания загрузки
    this.setState({
      waiting: true,
    });
    try {
      const responseCategories = await fetch('/api/v1/categories');
      const jsonCategories = await responseCategories.json();

      this.setState({
        ...this.getState(),
        categories: getCategories(jsonCategories.result.items),
        waiting: false,
      });
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        ...this.getState(),
        waiting: false,
        error: e.message
      });
    }
  }
}

export default CategoriesState;
