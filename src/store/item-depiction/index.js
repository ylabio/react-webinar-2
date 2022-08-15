import StateModule from "../module";
import routes from "../../API/routes";

/**
 * Состояние товара
 */
class ItemDepictionState extends StateModule{
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        item: {}, 
    };
  }

  async load(itemId){
    const pathToQuantity = routes.itemDepiction(itemId)
    const resposne = await fetch(pathToQuantity)
    const itemDesciption = await resposne.json()
    this.setState({
      item: itemDesciption.result
    });
  }
}

export default ItemDepictionState;
