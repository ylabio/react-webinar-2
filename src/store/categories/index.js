import createCategoryList from "../../utils/create-category-list";
import createCategoryTree from "../../utils/create-category-tree";
import StoreModule from "../module";

class CategoryStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
     categories: []
    };
  }

  /**
   * Загрузка списка категорий
   * 
   */
  async loadCategories(){
      const response = await fetch(`/api/v1/categories?limit=10*&fields=_id,parent,title`);
      const json = await response.json();
      const items = json.result.items;

      let rootCategories = items.filter(i => i.parent === null).map(i => ({value: i._id, title: i.title}));
    
      rootCategories.forEach(i => createCategoryTree(i, items));    
      
      let categoryList=[];
      rootCategories.forEach(i => createCategoryList(i, 0, categoryList));
      this.setState({
        categories: categoryList
      }, 'Загрузка списка категорий')
  }
}

export default CategoryStore;
