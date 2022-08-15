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
   */
  async pageLoad(id){
    this.setState({
      ...this.state,
      loading: true
    });
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
   
    const json = await response.json();
    const page = json.result;
    sessionStorage.setItem('item', JSON.stringify(page));
    const savePage = JSON.parse(sessionStorage.getItem('item'));
    
    this.setState({
      page: savePage,
      loading: false
    });
  }
  
}

export default PageStore;
