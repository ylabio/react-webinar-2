import StateModule from '../module';

/**
 * Состояние товара
 */
class ArticleState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      waiting: false,
      error: ''
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      error: ''
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      if (!response.ok)
        throw new Error(response.statusText);

      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      });

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        waiting: false,
        error: e.message
      });
    }
  }
}

export default ArticleState;
