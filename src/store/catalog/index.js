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
      loading: false,
      page: 1,
      limit: 10,
      pagesCount: 0
    };
  }

  //Загрузка списка товаров
   async load() {

     this.setState({
       ...this.getState(),
       loading: true
     }, `Начало загрузки списка товаров на странице`)

     const limit = this.getState().limit;
     const skip = (this.getState().page - 1) * limit;
     const response = await fetch(`/api/v1/articles/?&limit=${limit}&skip=${skip}&fields=items(*),count`);
     const json = await response.json();
  
     this.setState({
       ...this.getState(),
       items: json.result.items,
       pagesCount: Math.ceil(json.result.count / limit),
       loading: false
      }, `Завершение загрузки списка товаров на странице`); 
    }
  
  /**
   * Изменение текущей страницы
   */
  changeCurrentPage(page){
    this.setState({
      ...this.getState(),
      page
    })
  }

}

export default CatalogState;
