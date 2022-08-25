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
      error: '',
      waiting: false
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      waiting: true,
      data: {}
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();

      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      });
    } catch (e){
      // Ошибка при загрузке
      this.setState({
        data: {},
        error: e,
        waiting: false
      });
    }
  }
}

export default ArticleState;
