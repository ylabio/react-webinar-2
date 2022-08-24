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
      waiting: false,
      categories: [],
    };
  }

  /**
   * Загрузка категорий, и их сортировка
   * @returns {Promise<void>}
   */
  async loadCategories() {
    const response = await fetch('/api/v1/categories?limit=11');
    const json = await response.json();
    const items = json.result.items;

    const createTreeData = (arr) => {
      const tree = Object.fromEntries(
        arr.map((item) => [item._id, { ...item, parent_id: item.parent?._id, children: [] }])
      );
      return Object.values(tree).filter((item) => !tree[item.parent_id]?.children.push(item));
    };

    console.log(createTreeData(items));

    function formateTree(arr, prefix = '') {
      let res = [];
      arr.forEach((item) => {
        res = [
          ...res,
          { value: item._id, title: prefix + item.title },
          ...(item.children ? formateTree(item.children, prefix + '- ') : {}),
        ];
      });
      return res;
    }

    const allCategories = formateTree(createTreeData(items));
    console.log(allCategories);

    this.setState({
      ...this.getState(),
      categories: allCategories,
    });
  }
}

export default CategoriesState;
