import StateModule from "../module";

/**
 * Состояние категорий товаров
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    };
  }

  /**
   * Загрузка списка категорий товаров
   */
  async load(){
    // Сброс текущиего списка категорий и установка признака ожидания загрузки
    this.setState({
      waiting: true,
      categories: [],
    });

    try {
      const response = await fetch(`/api/v1/categories?limit=*`);
      const json = await response.json();

      // Список категорий загружен успешно
      this.setState({
        categories: json.result.items,
        waiting: false,
      });
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        categories: [],
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
