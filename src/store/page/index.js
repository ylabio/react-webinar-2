import { useNavigate } from "react-router";
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
      ...this.state,
      loading: true
    }, `Начало загрузки страницы товара`);

    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    console.log(json)
    const page = json.result;
    
    this.setState({
      page: page,
      loading: false
    }, `Завершение загрузки страницы товара`);
  }
  
}

export default PageStore;
