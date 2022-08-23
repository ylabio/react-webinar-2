import StateModule from '../module';
import { categoriesMap } from '../../utils/categoriesMap';

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
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load() {
    try {
      const response = await fetch(`/api/v1/categories?limit=*`);
      const json = await response.json();

      const categories = [{ _id: '*', key: '00', title: 'Всё' }].concat(
        categoriesMap(json.result.items)
      );

      this.setState({
        categories,
      });
    } catch (e) {
      this.setState({
        categories: [],
      });
    }
  }
}

export default CategoriesState;
