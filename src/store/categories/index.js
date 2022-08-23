import StateModule from "../module";

/**
 * Состояние пользователя
 */
class CategoriesState extends StateModule{

  initState() {
    return {
      allCategories: [],
    };
  }

  // Загрузка всех категорий
  async loadAllCategories(){
    const response = await fetch(`/api/v1/categories?fields=items(*),parent&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      allCategories: json.result.items,
    });
  }
}

export default CategoriesState;
