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
      count: 0,
      pagination: {
        activePage: 1,
        pageSize: 10,
        totalPages: null,
        visiblePages: null
      }
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles?limit=10&fields=items(*),count');
    const json = await response.json();
    const totalPages = Math.round(json.result.count / this.getState().pagination.pageSize)

    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      pagination: {
        ...this.getState().pagination,
        totalPages: totalPages,
        visiblePages: this.getPageNumbers(this.getState().pagination.activePage, totalPages)
      }
    }, 'Начальная загрузка товаров');
  }

   /**
   * Gереключении страниц в пагинации и загрузка данных
   * @param pageNum
   */
  async loadPage(pageNum){
    const response = await fetch(`/api/v1/articles?limit=10&skip=${pageNum*10-10}`);
    const json = await response.json();
    
    const pageNumbers = this.getPageNumbers(pageNum, this.getState().pagination.totalPages)

    this.setState({
      ...this.getState(),
      items: json.result.items,
      pagination: {
        ...this.getState().pagination, 
        activePage: pageNum,
        visiblePages: pageNumbers
      }
    }, `Переключение между страницами пагинации, текущая ${pageNum}`);
  }

  // Возвращает массив из необходимых для рендера номеров страниц на основе активной страницы
  // отрицательные значения соответствуют "..."
  getPageNumbers(activePage, totalPages){
    
    // сюда складываем кусочки от общего массива + разделяем многоточиями
    let paginationItems = []
    // массив всех номеров страниц от 0 до totalPages 
    let arr = Array.from(Array(totalPages).keys())
    // возвращаем цельный массив, если страниц 5 или меньше
    if (totalPages < 6) {
      return arr.slice(0, 5)
    }
    switch (activePage) {
      case 1:
      case 2: 
        return paginationItems.concat(arr.slice(0, 3), -1, arr.slice(-1));
      case 3: 
        return paginationItems.concat(arr.slice(0, 4), -1, arr.slice(-1));
      case totalPages - 2: 
        return paginationItems.concat(arr[0], -1, arr.slice(-4));
      case totalPages - 1:
      case totalPages: 
        return paginationItems.concat(arr[0], -1, arr.slice(-3)); break;
      default: 
        return paginationItems.concat(
          arr[0],
          -1,
          arr.slice(activePage - 2, activePage + 1),
          -2,
          arr[totalPages - 1]
        );
    }
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
