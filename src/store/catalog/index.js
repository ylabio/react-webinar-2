import counter from "../../utils/counter";
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
      paginator: {
        totalCount: null,
        perPage: 10,
        currentPage: 1,
        totalPages: null
      }
    };
  }

  async load() {
    this.setLoading(true)
    const page = this.getState().paginator.currentPage
    const perPage = this.getState().paginator.perPage
    const pageNumber = (page * perPage) - perPage
    const response = await fetch(`/api/v1/articles?limit=${perPage}&skip=${pageNumber}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      isLoading: false,
      paginator: {
        ...this.getState().paginator,
        totalCount: json.result.count,
        totalPages: json.result.count/perPage
      }
    });
  }

  setLoading(isLoading) {
    this.setState({
      ...this.getState(),
      isLoading: isLoading
    })
  }

  setCurrentPage(page){
    this.setState({
      ...this.getState(),
      paginator: {
        ...this.getState().paginator,
        currentPage: page
      }
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
