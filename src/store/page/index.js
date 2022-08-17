import StoreModule from "../module";

class PageStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      page: {},
      loading: false
    };
  }

  /**
   * Загрузка страницы товара
   * @param _id Код товара
   */
  async pageLoad(_id){

    this.setState({
      ...this.getState(),
      loading: true
    }, `Начало загрузки страницы товара`);

    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    const page = json.result;
    
    this.setState({
      page,
      loading: false
    }, `Завершение загрузки страницы товара`);
  }
  
}

export default PageStore;
