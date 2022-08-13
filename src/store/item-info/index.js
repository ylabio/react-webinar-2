import StateModule from '../module';

/**
 * Состояние каталога
 */
class ItemInfoState extends StateModule {
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
        price: 0,
        maidIn: '',
        category: '',
        edition: 0
      }
    };
  }

  /**
   *
   * @param id
   */
  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        info: {
          _id: json.result._id,
          title: json.result.title,
          description: json.result.description,
          maidIn: `${json.result.maidIn.title} (${json.result.maidIn.code})`,
          category: json.result.category.title,
          price: json.result.price,
          edition: json.result.edition
        }
      },
      'Загружена информация о товаре'
    );
  }
}

export default ItemInfoState;
