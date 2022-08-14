import StateModule from '../module';

/**
 * Состояние отдельного предмета
 */
class DetailsState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
    };
  }

  async fetchDetails(articleId) {
    const response = await fetch(
      `/api/v1/articles/${articleId}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json,
    });
  }
}

export default DetailsState;