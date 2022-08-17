import StateModule from "../module";

/**
 * Управление страницей товара
 */
class ItemStage extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: null,
      loading: null
    };
  }

  async load(item) {
    this.setState({
      loading: true
    })
    const response = await fetch(`api/v1/articles/${item}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result,
      loading: false
    });
  }
  /**
   *Отчистка стейта 
   */
  clear() {
    this.setState({
      item: null,
      loading: null
    });
  }
}

export default ItemStage;


