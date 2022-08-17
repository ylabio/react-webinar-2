import ModuleState from '../module';

/**
 * Состояние карточки товара
 */
class ArticleState extends ModuleState {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {}
    };
  }

  /**
   * Получение записи с сервера по ее коду
   * @param id
   */
  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?lang=ru&fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result
    }, 'Получение записи с сервера по ее коду');
  }

  /**
   * Очистка состояния
   */
  clearState() {
    this.setState({
      item: {}
    }, 'Очистка состояния');
  }
}

export default ArticleState;