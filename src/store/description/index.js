import StateModule from "../module";

/**
 * Состояние описания
 */
class DescriptionState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: null,
      loading: true,
    };
  }

  /* Загрузка элемента */
  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result,
      loading: false,
    });
  }

  /* Сброс элемента */
  reset() {
    this.setState({ ...this.getState(), loading: true, item: null })
  }

}

export default DescriptionState;