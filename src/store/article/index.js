import StateModule from "../module";

/**
 * Состояние товара
 */
class ArticleState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      waiting: false
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id){
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      waiting: true,
      data: {}
    }, 'Сброс текущего товара и установка признака ожидания загрузки');

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();

      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      }, 'Получена информация о товаре');
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        data: {},
        waiting: false
      }, 'Ошибка получения информации о товаре');
    }
  }
}

export default ArticleState;
