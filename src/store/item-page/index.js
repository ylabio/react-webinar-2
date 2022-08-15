import StateModule from "../module";

/**
 * Состояние страницы товара
 */
class ItemPageState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      itemInfo: {
        _id: '',
        title: 'title',
        description: 'description',
        maidIn: 'maidIn',
        category: 'category',
        edition: 0,
        price: 0
      }
    };
  }

  /**
   * Загрузка подробной информации о товар
   * @param id {String} Код товара
   */
  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      itemInfo: {
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        maidIn: `${json.result.maidIn.title} (${json.result.maidIn.code})`,
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price
      }
    }, 'Загрузка подробной информации о товаре');
  }
}

export default ItemPageState;
