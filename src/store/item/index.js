import StateModule from "../module";
import ApiService from "../../utils/api-service";

/**
 * Состояние товара
 */
class ItemState extends StateModule{

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
   * Загрузка товара
   */
  async loadItem(_id) {
    const response = await ApiService.getOne(_id);
    this.setState({
      item: response.result
    },'Загрузка информации о товаре с сервера');
  }
}

export default ItemState;