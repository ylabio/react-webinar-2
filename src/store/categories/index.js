import {sortByParents} from '../../utils/sortByParents';
import StateModule from '../module';

/**
 * Состояние каталога
 */
class CategoriesState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: []
    };
  }

  async load() {
    const response = await fetch(`api/v1/categories?limit=*`);
    const json = await response.json();
    const items = json.result.items;
    const sortedItems = sortByParents(items);
    this.setState({
      ...this.getState(),
      items: sortedItems
    });
  }
}

export default CategoriesState;
