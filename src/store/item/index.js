import StateModule from "../module";

/**
 * Подробные данные товара
 */
class ItemState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      fields: {}
    };
  }

  /**
   * Загрузка основных и дополнительных полей по итему
   * @param {string}
   */
  async load(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      fields: json.result
    });
  }
}

export default ItemState;
