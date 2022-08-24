import { getSelectOptions } from "../../service/filters";
import { fn } from "../../utils/categories";
import StateModule from "../module";

class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      options: [],
    };
  }

  async getCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const {result: {items}} = await getSelectOptions();
      
      const options = items.filter(item => !item.parent)
        .map(parent => fn(items, parent, []))
        .reduce((acc, item) => [...acc, ...item], [])
        .map(item => ({value: item._id, title: item.hash + item.title}));

      this.setState({
        ...this.getState(),
        waiting: false,
        options: options,
      });
    } catch (error) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });
    }
  }
}

export default CategoriesState;
