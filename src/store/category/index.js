import getTree from '../../utils/get-tree';
import sortCategory from '../../utils/sort-category';
import StateModule from '../module';
/**
 * Состояние товара
 */
class categoryState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      category: null
    };
  }

  async setCategoryList() {
    const response = await fetch('/api/v1/categories?limit=*')
    const json = await response.json();
    json.result.items.forEach(value => {
      if (!value.parent) {
        value['parent'] = {
          _id: 0
        }
      }
    })
    const tree = getTree(json.result.items, '_id',);
    const arrayCategory = sortCategory(tree[0]['children'], -1, [])
    this.setState({
      ...this.getState(),
      category: [{
        title: "Все",
        value: 'all'
      }, ...arrayCategory]
    })
  }


}

export default categoryState;