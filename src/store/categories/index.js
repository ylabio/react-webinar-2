import StateModule from '../module';
import { makeTree, putDashes, sortArray } from '../../utils/handle-filters';

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
      filter: [],
      waiting: false,
    };
  }

  async getFilterCategories() {
    this.setState({
      filter: [],
      waiting: true,
    });

    const response = await fetch(`api/v1/categories?limit=*`);
    const json = await response.json();
    const categories = await json.result.items;

    const tree = makeTree(categories);
    const dashedArray = putDashes(tree);
    const sortedArray = sortArray(dashedArray);

    const result = [
      { value: '', title: 'Все' },
      ...sortedArray.map((item) => {
        return { value: item._id, title: item.title };
      }),
    ];

    this.setState({
      filter: result,
      waiting: false,
    });
  }
}

export default CategoriesState;
