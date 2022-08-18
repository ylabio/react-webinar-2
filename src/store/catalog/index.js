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
      query:{
        skip:0,
        limit:10
      }
    };
  }

  async load(params){
    const response = await fetch(`/api/v1/articles${(params) 
      ? '?' + params + '&fields=items(*),count' 
      : '?limit=10&skip=0&fields=items(*),count'}`);
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      items: json.result.items,
      itemsCount: json.result.count,
    });
  }

  async loadId(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=%2A&lang=ru`);
    const json = await response.json();
  
    this.setState({
      ...this.getState(),
      items: [json.result],
    });
  }

  setActive(index){
    this.setState({
      ...this.getState(),
      activePage: index
    })
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
