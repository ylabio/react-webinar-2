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
      loading: false
    };
  }

  /**
   * Загрузка списка товаров
   */
   async load(page = 0) {

    this.setState({
      ...this.state,
      loading: true
    })

    const skip = page * limit;
    const response = await fetch(`/api/v1/articles/?&limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const items = json.result.items;
  
    this.setState({
      items: items,
      page,
      pagesCount: Math.ceil(json.result.count/limit),
      loading: false
    }); 
  }

}

export default CatalogState;
