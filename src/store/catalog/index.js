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
      isLoading: true,
      currentPage: 1,
      limitPerPage: 10,
      totalPages: 0
    };
  }

 
  async load(newPage){
    this.setState({
      ...this.getState(),
      isLoading: true,
    }, 'Смена пагинации');

    const limitPerPage = this.getState().limitPerPage;
    const skipPages = (newPage - 1) * limitPerPage

    let result;
    try {
    const response = await fetch(`/api/v1/articles?limit=${limitPerPage}&skip=${skipPages}&fields=items(*),count`);
    const json = await response.json();
    result = json.result
    } catch (error) {
      console.error(error);
    }
    
    this.setState({
      ...this.getState(),
      items: result.items,
      isLoading: false,
      currentPage: newPage,
      totalPages: result.count,
    }, 'Загрузка товаров');
  }

  resetLoader() {
    this.setState({
      ...this.getState(),
      isLoading: true
    }, 'Смена страницы пагинации');
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
