import StateModule from '../module';

/**
 * Состояние каталога
 */
class ItemState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      _id: 0,
      title: 'title',
      description: 'description',
      price: 0,
      maidIn: 'maidIn',
      edition: 0,
      category: 'category'
    };
  }

  /**
   *
   * @param id
   */
  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      _id: json.result._id,
      title: json.result.title,
      description: json.result.description,
      price: json.result.price,
      maidIn: `${json.result.maidIn.title} (${json.result.maidIn.code})`,
      edition: json.result.edition,
      category: json.result.category.title
    }, 'Загрузка товара');
  }
}

export default ItemState;