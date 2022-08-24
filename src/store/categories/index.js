import Api from "../../API";
import StateModule from "../module";

/**
 * Состояние товара
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
    };
  }

  /**
   * Загрузка списка товаров
   */
  async initCategories() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      categories: [],
      waiting: true,
    });

    try {
      const result = await Api.getCategories();
      this.setState({
        ...this.getState(),
        categories: result,
      });
    } catch (e) {
      console.log(`Фильтр по категориям недоступен. Ошибка: ${e}`);
      this.setState({
        ...this.getState(),
        categories: [],
      });
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
