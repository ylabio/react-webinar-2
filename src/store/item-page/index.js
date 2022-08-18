import counter from "../../utils/counter";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class ItemPageState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentItem: {},
      currentItemCountry: '',
      currentItemCountryCode: '',
      currentItemCountryCategory: '',
    };
  }

  async loadItemById(itemId){
    const response = await fetch(`/api/v1/articles/${itemId}?fields=title%2Cdescription%2CmaidIn%2Cprice%2Ccategory%2Cedition&lang=ru`);
    const json = await response.json();

    const country = await this.loadCountryById(json.result.maidIn._id)
    const category = await this.loadCategoryById(json.result.category._id)
    this.setState({
      ...this.store.state.itemPage,
      currentItem: json.result,
      currentItemCountry: country.title,
      currentItemCountryCode: country.code,
      currentItemCategory: category,
    },'this item');
  }

  async loadCountryById(id){
    const response = await fetch(`/api/v1/countries/${id}?lang=ru&fields=title%2Ccode`);
    const json = await response.json();
    let country = json.result

    return country
  }
  async loadCategoryById(id){
    const response = await fetch(`/api/v1/categories/${id}?lang=ru&fields=title`);
    const json = await response.json();
    let category = json.result.title
    
    return category
  }


}

export default ItemPageState;
