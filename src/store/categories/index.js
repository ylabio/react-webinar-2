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
    }, 'store/categories [load] сброс');

    try {
      const response = await fetch(`/api/v1/categories`);
      const json = await response.json();

      // Список категорий загружен успешно
      this.setState({
        items: json.result.items,
        waiting: false
      }, 'store/categories [load] успешно');
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информацию об ошибке
      this.setState({
        items: [],
        waiting: false
      }, 'store/categories [load] не удалось');
    }
  }
}

export default CategoriesState;
