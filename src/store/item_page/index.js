import StateModule from "../module";

/**
 * Состояние корзины
 */
class ItemPageState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        _id: '',
       item: {}
    };
  }
 
  async loadItem(_id){
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      _id,
      item: json.result,
    });
  }

  /**
   * получение id продукта
   * @param _id Код товара
   */
  getId(_id) {
    this.setState({
      _id,
      item: {}
    })
  }


   /**
   * обнуление остояния
   *  
   */

   toNull() {
    this.setState({
      _id: '',
      item: {}
    })
   }
 
}

export default ItemPageState;
