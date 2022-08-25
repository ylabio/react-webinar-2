import StateModule from '../module';
import createCategories from '../../utils/categories-creator';

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

    console.log('response', json.result.items);

    let children = [];
    let parents = [];
    json.result.items.forEach((item) => {
      if (!item.parent) {
        parents.push({ value: item._id, parent: null, title: item.title });
      } else {
        children.push({
          value: item._id,
          parent: item.parent,
          title: item.title,
        });
      }
    });

    const result = createCategories(children, parents);

    this.setState({
      categories: [...this.initState().categories, ...result],
    });
  }
}

export default CategoriesState;
