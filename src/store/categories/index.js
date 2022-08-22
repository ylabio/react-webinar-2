import StateModule from "../module";
import {groupCategories} from "../../utils/group-categories";

/**
 * Состояние товара
 */
class Categories extends StateModule{

  initState() {
    return {
      categories: [],
      waiting: false
    };
  }

  async loadCategories(){
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      categories: [],
      waiting: true,
    });

    try {
      const response = await fetch('/api/v1/categories');
      const json = await response.json();

      this.setState({
        categories: groupCategories(json.result.items),
        waiting: false
      });
    } catch (e){
      this.setState({
        data: [],
        waiting: false
      });
    }
  }
}

export default Categories;