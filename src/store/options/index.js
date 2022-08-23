import StateModule from "../module";
import categoriesTransformer from "../../utils/categoriesTransformer";

class OptionsState extends StateModule{

  initState() {
    return {
      categories: [{ id: '01', value: '', title: 'Все' }],
    };
  }

  async fetchCategories() {
    try {
      const response = await fetch('/api/v1/categories?limit=*');
      const data = await response.json();
      const categories = categoriesTransformer(data.result.items);

      this.setState({
        ...this.getState(),
          categories: [...this.initState().categories, ...categories],
      });

    } catch (err) {
      console.log(err);
    }
  }
}

export default OptionsState;
