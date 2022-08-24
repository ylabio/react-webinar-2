import StateModule from '../module';
import categories from '../../utils/categories-creator';

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
      categories: [{ value: '', title: 'Все' }],
    };
  }

  // Загрузка списка категорий

  async setCategories() {
    const response = await fetch(`/api/v1/categories?limit=*`);
    const json = await response.json();

    const result = categories(json.result.items);

    this.setState({
      categories: [...this.initState().categories, ...result],
    });
  }
}

export default CategoriesState;
