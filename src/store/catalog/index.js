import { getSingleItem,getItems } from "../../services/api";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      productInfo: {
        _id: '',
        description: '',
        edition: 0,
        category: {title: ''},
        maidIn: {
          title: '',
          code: '',
        },
        price: 0,
      },
      count: 0,
    };
  }

  async load(limit, skip){
    const data = await getItems(limit, skip);
    this.setState({
      ...this.store.getState().catalog,
      items: data.items,
      count: data.count
    });
  }

  async getInfo(id) {
    const data = await getSingleItem(id);
    this.setState({
      ...this.store.getState().catalog,
      productInfo: data
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;