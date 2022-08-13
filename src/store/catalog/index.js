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
      currentPage: 1,
      limitPerPage: 10,
      totalPages: null
    };
  }

 
  async load(newPage){
    const limitPerPage = this.getState().limitPerPage;
    const skipPages = (newPage - 1) * limitPerPage

    const response = await fetch(`/api/v1/articles?limit=${limitPerPage}&skip=${skipPages}&fields=items(*),count`);
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      items: json.result.items,
      currentPage: newPage,
      totalPages: json.result.count

    }, 'Загрузка товаров');
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
