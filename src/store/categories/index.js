import StateModule from "../module";
import qs from 'qs';

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
}

/**
 * Состояние каталога
 */
class CategoryState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: []
    };
  }

  async initCategories(){
    try {
      const response = await fetch(`/api/v1/categories/?limit=*`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        categories: json.result.items
      });
    } catch(e) {

    }
      
  }

}

export default CategoryState;
