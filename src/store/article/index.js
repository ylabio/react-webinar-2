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
   * Загрузка товаров по id
   */
  async load(id){
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      waiting: true,
      data: {}
    }, 'Ожидание загрузки товара');

    try {
      const json = await this.services.api.request({url: `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`});
      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      }, 'Товар по id загружен');
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        data: {},
        waiting: false
      }, 'Ошибка загрузки товара');
    }
  }
}

export default ArticleState;
