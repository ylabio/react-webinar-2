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
      allPages: 1,
      currentPage: 1,     
      item: {}
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(*),count');
    const json = await response.json();
    const allPages = (json.result.count/10)%1 !== 0 ? Math.trunc(json.result.count/10) + 1: (json.result.count/10);
    this.setState({
      items: json.result.items,
      currentPage: 1,
      allPages: allPages,
      item: this.store.state.catalog.item
    });
  }
  async getPage(page) {
    const response = await fetch('/api/v1/articles?limit=10&skip=' + `${10*(page-1)}`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      currentPage: page,
      allPages: this.store.state.catalog.allPages,
      item: this.store.state.catalog.item
    });
  }
  async getItemPage(id) {
    const response = await fetch('/api/v1/articles/' + `${id}` + "?fields=*,maidIn(title,code),category(title)");
    const json = await response.json();
    this.setState({
      item: json.result,
      items: [...this.store.state.catalog.items, json.result],
      currentPage: this.store.state.catalog.currentPage,
      allPages: this.store.state.catalog.allPages
    });
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
