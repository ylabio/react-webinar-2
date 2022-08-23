import StateModule from "../module";
/**
 * Состояние категорий
 */
class Categories extends StateModule{

  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
      waiting: false
    };
  }

  /**
   * Запоминаем состояние категорий
   */
  async setCategories(){
    // Установка признака загрузки категорий
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Установка признаков закгрузки категорий');
    //получаем список категорий 
    try {
      const categoriesResponse = await fetch(`/api/v1/categories?limit=*`);
      const categories = await categoriesResponse.json();

      this.setState({
        categories: categories.result.items,
        waiting: false
      }, 'Получение списка категорий');
    } catch(err) {
      console.log(err);
    }  
  }  
}

export default Categories;
