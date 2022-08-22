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
      
      const options = items.filter(v => !v.parent).map(v => fn(items, v, [])).reduce((acc, v) => [...acc, ...v], []).map(v => ({value: v._id, title: v.hash + v.title}));

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
