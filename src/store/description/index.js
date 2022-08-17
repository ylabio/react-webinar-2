import StateModule from '../module';

/**
 * Управление модальными окнами
 */
class DescriptionState extends StateModule {
  initState() {
    return {
      item: {},
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  async loadById(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({ item: json.result }, 'загрузка по id');
  }
}

export default DescriptionState;
