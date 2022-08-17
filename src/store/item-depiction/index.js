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
        status: 'idle',
        item: {}, 
    };
  }

  async load(itemId){
    this.setState({
      ...this.store.state.itemDepiction,
      status: 'in process',
    });
    const pathToQuantity = routes.itemDepiction(itemId)
    const resposne = await fetch(pathToQuantity)
    const itemDesciption = await resposne.json()
    this.setState({
      status: `${itemId} finished`,
      item: itemDesciption.result
    });
  }
}

export default ItemDepictionState;
