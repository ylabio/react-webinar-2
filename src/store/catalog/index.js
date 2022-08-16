import StateModule from "../module";

const limit = 10;

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
      page: 1
    };
  }

  /**
   * Загрузка списка товаров
   * @param page
   */
   async load(page) {

    this.setState({
      ...this.state,
      loading: true
    }, `Начало загрузки списка товаров на странице ${page}`)

    const skip = (page - 1) * limit;
    const response = await fetch(`/api/v1/articles/?&limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const items = json.result.items;
  
    this.setState({
      items: items,
      page,
      pagesCount: Math.ceil(json.result.count/limit),
      loading: false
    }, `Завершение загрузки списка товаров на странице ${page}`); 
  }

}

export default CatalogState;
