import StateModule from "../module";
// import transformCategories from './../../utils/transform-categories';
import {transformCategories} from './../../utils/transform-categories';

/**
 * Состояние категорий
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryItems: []
    };
  }

  /**
   * Запись категорий товаров
   */
  async fetchCategories(){
		const resp = await fetch('/api/v1/categories');
		const json = await resp.json();

		const updateCategories = transformCategories(json.result.items);

    this.setState({
			categoryItems: updateCategories
		})
  }
}

export default CategoriesState;
