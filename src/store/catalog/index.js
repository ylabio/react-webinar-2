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
    console.log('state')
    console.log(this)
    this.setState({
      ...this.store.state.catalog,
      items: json.result.items
    },'load page');
  }

  async loadItemById(itemId){
    const response = await fetch(`/api/v1/articles/${itemId}?fields=title%2Cdescription%2CmaidIn%2Cprice%2Ccategory%2Cedition&lang=ru`);
    const json = await response.json();

    const countryResponse = await fetch(`/api/v1/countries/${json.result.maidIn._id}?lang=ru&fields=title%2Ccode`);
    const countryJson = countryResponse.json();
    console.log(countryResponse.json())

    const categoryResponse = await fetch(`/api/v1/categories/${json.result.category._id}?lang=ru&fields=title`);
    const categoryJson = categoryResponse.json();
    console.log(categoryResponse.json())
    this.setState({
      ...this.store.state.catalog,
      currentItem: json.result,
      currentItemCountry: countryJson.title,
      currentItemCountryCode: countryJson.code,
      currentItemCountryCategory: categoryJson.title,
    },'this item');
  }

  // async loadCountryById(){
  //   const response = await fetch(`/api/v1/countries/${this.store.state.catalog}?lang=ru&fields=title%2Ccode`);
  //   const json = await response.json();
  //   console.log('this item')

  //   const response = await fetch(`/api/v1/countries/${this.store.state.catalog}?lang=ru&fields=title%2Ccode`);
  //   console.log(this)
  //   this.setState({
  //     ...this.store.state.catalog,
  //     currentItemCountry: json.result.title,
  //     currentItemCountryCode: json.result.code
  //   },'this item');
  // }
  async loadCategoryById(categoryId){
    const response = await fetch(`/api/v1/categories/${this.store.state.catalog.currentItem.maidIn._id}?lang=ru&fields=title`);
    const json = await response.json();
    console.log('this item')
    console.log(this)
    this.setState({
      ...this.store.state.catalog,
      currentItemCategory: json.result.title
    },'this item');
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
