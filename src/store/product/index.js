import { getInfoById } from "../../service";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class ProductState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      info: {
        _id: '',
        title: '',
        description: '',
        edition: 0,
        category: {title: ''},
        maidIn: {
          title: '',
          code: '',
        },
        price: 0,
      },
    };
  }

  async getInfo(id) {
    const data = await getInfoById(id);
    this.setState({
      info: data
    });
  }
}

export default ProductState;
