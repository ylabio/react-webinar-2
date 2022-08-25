import StateModule from "../module";

/**
 * Состояние товара
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      waiting: false
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(){
    // Сброс текущего списка категорий и установка признака ожидания загрузки
    this.setState({
      items: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?limit=*`);
      const json = await response.json();

      // Список категорий загружен успешно
      this.setState({
        items: json.result.items,
        waiting: false
      });
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информацию об ошибке
      this.setState({
        items: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;