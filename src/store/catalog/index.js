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
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      isLoading: false
    };
  }

 /**
   * Загрузка списка товаров на страницу
   */
  async load(){
    const limit = this.getState().pageSize;
    const skip = (this.getState().currentPage - 1) * this.getState().pageSize;
    
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
   
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      totalCount: json.result.count
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

 /**
   * Смена страницы
   */
  changePage(page){
    this.setState({
      ...this.getState(),
      pageSize: 10,
      currentPage: page
    }, 'Изменение номера страницы');
  }
}

export default CatalogState;
