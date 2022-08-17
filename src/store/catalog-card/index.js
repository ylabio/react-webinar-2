import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogCardState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
    };
  }

  // async load(id){
  //   const response = await fetch(`/api/v1/articles/${id}?lang=ru`);
  //   const json = await response.json();
  //
  //
  //   const [countryJson, categoryJson] = await Promise.all([
  //     fetch(`/api/v1/countries/${json.result.maidIn._id}?lang=ru`).then(response => response.json()),
  //     fetch(`/api/v1/categories/${json.result.category._id}?lang=ru`).then(response => response.json()),
  //   ])
  //
  //   this.setState({
  //     item: json.result,
  //     itemCountry: countryJson.result,
  //     itemCategory: categoryJson.result,
  //   });
  // }

  async load(id){
    const response = await fetch(`/api/v1/articles/${id}?lang=ru&fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      item: json.result,
    });

    if (this.store.get('catalog').getState().items.find((item) => item._id === json.result._id) === undefined) {
      this.store.get('catalog').setItem(json.result)
    }
  }
}

export default CatalogCardState;
