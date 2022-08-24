import StateModule from "../module";

/**
 * Состояние для категорий товаров
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: []
    };
  }

  /**
   * Получение списка категорий товаров с сервера
   * @return {Promise<void>}
   */
   async getCategories(){
    const response = await fetch('/api/v1/categories?&limit=*');
    const json = await response.json();
    this.setState({
        list: json.result.items,
      });
  }
}

export default CategoriesState;