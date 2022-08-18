import counter from "../../utils/counter";
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
      amount: 0,
      currentItem: {},
      currentItemCountry: '',
      currentItemCountryCode: '',
      currentItemCountryCategory: '',
    };
  }

  // async load(){
  //   const response = await fetch('/api/v1/articles?limit=10&skip=20');
  //   const json = await response.json();
  //   this.setState({
  //     ...this.state,
  //     items: json.result.items
  //   },'load');
  // }

  async loadPage(limit, currentPage){
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${currentPage * limit - limit}`);
    const json = await response.json();
    this.setState({
      ...this.store.state.catalog,
      items: json.result.items
    },'load page');
  }

  async loadItemById(itemId){
    const response = await fetch(`/api/v1/articles/${itemId}?fields=title%2Cdescription%2CmaidIn%2Cprice%2Ccategory%2Cedition&lang=ru`);
    const json = await response.json();

    const country = await this.loadCountryById(json.result.maidIn._id)
    const category = await this.loadCategoryById(json.result.category._id)
    this.setState({
      ...this.store.state.catalog,
      // items: json.result,
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
