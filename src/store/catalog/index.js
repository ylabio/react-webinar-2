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
        totalPages: null
      },
      loading: true,
      error: ''
    };
  }

  async load(){
    this.setState({...this.getState(), loading: true}, 'Лоадер')
    try {
      const response = await fetch(`/api/v1/articles?limit=${this.getState().pagination.pageSize}&fields=items(*),count&lang=ru`);
      const json = await response.json();
      const totalPages = Math.round(json.result.count / this.getState().pagination.pageSize)

      this.setState({
        ...this.getState(),
        items: json.result.items,
        count: json.result.count,
        loading: false,
        pagination: {
          ...this.getState().pagination,
          activePage: 1,
          totalPages: totalPages
        }
      }, 'Начальная загрузка товаров');
    } catch (err) {
      console.log(err)
      this.setState({
        ...this.getState(),
        loading: false,
        error: 'Ошибка загрузки товаров'
      })
    }
  }

   /**
   * Переключение страниц в пагинации и загрузка данных
   * @param pageNum
   */
  async loadPage(pageNum){
    this.setState({...this.getState(), loading: true}, 'Лоадер')
    const limit = this.getState().pagination.pageSize
    const skip = pageNum * limit - limit
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&lang=ru`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items,
      loading: false,
      pagination: {
        ...this.getState().pagination, 
        activePage: pageNum,
      }
    }, `Переключение между страницами пагинации, текущая ${pageNum}`);
  }

     /**
   * Загрузка подробной страницы товара
   * @param _id
   */
      async loadArticle(_id){
        this.setState({...this.getState(), loading: true}, 'Лоадер')
        try {
          const response = await fetch(`/api/v1/articles/${_id}?lang=ru`)
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
            loading: false,
            error: ''
          }, `Загрузка страницы товара`);

        } catch (err) {
          console.log(err)
          this.setState({
            ...this.getState(),
            loading: false,
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
