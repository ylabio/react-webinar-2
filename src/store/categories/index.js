import StateModule from '../module';
import buildCategoryArray from '../../utils/get-category-array';

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
      data: [
        { value: '*', title: 'Все' }
      ]
    };
  }

  /**
   * Подгрузка и установка категорий товаров
   * @return {Promise<void>}
   */
  async load() {
    // Подгрузка и установка категорий товаров
    const response = await fetch('/api/v1/categories?limit=*');
    const json = await response.json();
    const categories = buildCategoryArray(json.result.items);
    this.setState({
      ...this.getState(),
      data: [...this.initState().data, ...categories]
    });
  }
}

export default CategoriesState;
