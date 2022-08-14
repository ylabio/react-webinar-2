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
      currentItem: {},
      pagination: {
        activePage: 1,
        pageSize: 10,
        totalPages: null,
        visiblePages: null
      },
      error: ''
    };
  }

  async load(){
    try {
      const response = await fetch(`/api/v1/articles?limit=${this.getState().pagination.pageSize}&fields=items(*),count`);
      const json = await response.json();
      const totalPages = Math.round(json.result.count / this.getState().pagination.pageSize)

      this.setState({
        ...this.getState(),
        items: json.result.items,
        count: json.result.count,
        pagination: {
          ...this.getState().pagination,
          activePage: 1,
          totalPages: totalPages,
          visiblePages: this.getPageNumbers(this.getState().pagination.activePage, totalPages)
        }
      }, 'Начальная загрузка товаров');
    } catch (err) {
      console.log(err)
      this.setState({
        ...this.getState(),
        error: 'Ошибка загрузки товаров'
      })
    }
    
  }

   /**
   * Переключение страниц в пагинации и загрузка данных
   * @param pageNum
   */
  async loadPage(pageNum){
    const limit = this.getState().pagination.pageSize
    const skip = pageNum * limit - limit
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
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
   * Загрузка подробной страницы товара
   * @param _id
   */
      async loadArticle(_id){
        try {
          const response = await fetch(`/api/v1/articles/${_id}`)
          const json = await response.json()
          const currentItem = json.result
  
          if (currentItem.category._id && currentItem.maidIn._id) {
            const [res1, res2] = await Promise.all([
              fetch(`/api/v1/countries/${currentItem.maidIn._id}?fields=title,code`),
              fetch(`/api/v1/categories/${currentItem.category._id}?fields=title`)
            ])
            const country = await res1.json()
            const category = await res2.json()

            currentItem.maidIn['title'] = country.result.title
            currentItem.maidIn['code'] = country.result.code
            currentItem.category['title'] = category.result.title
          }
          
          this.setState({
            ...this.getState(),
            currentItem: currentItem,
            error: ''
          }, `Загрузка страницы товара`);

        } catch (err) {
          console.log(err)
          this.setState({
            ...this.getState(),
            error: 'Ошибка загрузки товара'
          })
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
