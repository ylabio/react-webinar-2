import StateModule from "../module";

/**
 * Состояние
 */
class DescriptionState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      product: {
        _id: null,
        name: null,
        title: null,
        description: null,
        price: 0,
        maidIn: {
          title: null,
          code: null
        },
        category: null,
      }
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?lang=ru&fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      product: {
        ...this.getState(),
        _id: json.result._id,
        item: json.result,
        title: json.result.title,
        description: json.result.description,
        maidIn: {
          ...this.getState().maidIn,
          title: json.result.maidIn.title,
          code: json.result.maidIn.code,
        },
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price
      }
    });
  }

}

export default DescriptionState;
