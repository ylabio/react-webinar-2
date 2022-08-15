import StateModule from "../module";

/**
 * Состояние описания предмета
 */
class ItemDetailState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {};
  }

  async load(id){
    //const response = await fetch('/api/v1/articles?lang=ru');
    const response = await fetch(`api/v1/articles/${id}?fields=%2A&lang=ru`);
    const json = await response.json();
    const response1 = await fetch(`/api/v1/countries/${json.result.maidIn._id}?lang=ru&fields=%2A`);
    const json1 = await response1.json();
    const response2 = await fetch(`/api/v1/categories/${json.result.category._id}?lang=ru&fields=%2A`);
    const json2 = await response2.json();
    this.setState({
      ...this.getState(),
      item: json.result,
      country: json1.result,
      category: json2.result
    });
  }



}

export default ItemDetailState;
