import StateModule from "../module";

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

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const sortCategory = [];
      const sortCategories = (arr, items, parentId = null, prefixCount = 0) => {
        for (let item of items) {
          if (item.parent === parentId || item.parent?._id === parentId) {
            const value = { ...item };
            if (prefixCount) {
              value.title = "- ".repeat(prefixCount) + value.title;
            }
            arr.push(value);
            sortCategories(arr, items, value._id, prefixCount + 1);
          }
        }
      };

      const response = await fetch(
        `/api/v1/categories?limit=*&fields=_id,title,parent`
      );
      const json = await response.json();

      sortCategories(sortCategory, json.result.items);

      this.setState({
        categories: [{ _id: "", title: "Все" }, ...sortCategory],
        waiting: false,
      });
    } catch (e) {
      this.setState({
        categories: [],
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
