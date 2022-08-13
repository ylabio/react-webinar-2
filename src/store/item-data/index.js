import StateModule from "../module";

/**
 * Данные товара
 */
class ItemData extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {};
  }
  /**
   * Загрузка параметров товара по _id
   * @param _id Код товара
   */
  async loadById(_id) {
    const response = await fetch(`api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(json.result, `load ${json.result.title} item data`);
  }
}

export default ItemData;
