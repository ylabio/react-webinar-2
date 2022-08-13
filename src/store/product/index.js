import counter from '../../utils/counter';
import StateModule from '../module';

/**
 * Состояние каталога
 */
class ProductState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return { product: {}, country: '', category: '' };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    const res = json.result;
    this.setState({
      product: res,
      country: `${res.maidIn.title} ${res.maidIn.code}`,
      category: res.category.title,
    });
  }

  clearState() {
    this.setState({});
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState(
      {
        items: this.getState().items.filter((item) => item._id !== _id),
      },
      'Удаление товара'
    );
  }
}

export default ProductState;
