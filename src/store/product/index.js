import StateModule from "../module";

/**
 * Состояние страницы продукта
 */
class ProductState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
      madeIn: null,
      madeInCode: null,
      category: null,
      isDataLoaded: false

    };
  }

  /**
   * Загрузка товара по его ключу
   * Ключ товара отображается в адресной строке
   * @param key Код товара
   */
  async loadProduct(key){
    const response = await fetch(`/api/v1/articles?limit=1&skip=${key - 1}&fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result.items[0],
      madeIn: json.result.items[0].maidIn.title,
      madeInCode: json.result.items[0].maidIn.code,
      category: json.result.items[0].category.title,
      isDataLoaded: true
    }, 'Загрузка подробных данных товара');
  }

 /**
   * Удаление данных о товаре из стора
   */
  async clearProduct(){
    this.setState({
      ...this.getState(),
      item: {},
      madeIn: null,
      madeInCode: null,
      category: null,
      isDataLoaded: false
    }, 'Удаление данных о товаре из стора');
  }


}

export default ProductState;