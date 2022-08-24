import axios from 'axios';
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
      categoriesArray: []
    };
  }

  async load() {
    const response = await axios.get('/api/v1/categories?limit=*');

    this.setState({
      ...this.getState(),
      categoriesArray: response.data.result.items
    });
  }
}

export default CategoriesState;
