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
      limit: 10,
      lastPage: 1,
      currentPage: 1,
    };
  }

  /**
   * Загрузка данных с сервера(Тут можно передать номер страницы)
   */
  async load(){
    const response = await fetch(`/api/v1/articles?fields=items(*),count`);
    const json = await response.json();
    const {result} = json;
    const lastPage = Math.ceil(result.count / this.getState().limit);
    this.setState({
      ...this.getState(),
      items: result.items.slice(0, this.getState().limit),
      lastPage,
      currentPage: 1,
    });
  }
  
  /**
   * Загрузка одной страницы
   * @param {*} page - номер страницы
   */
  async loadPages(page) {
    const {limit} = this.getState();
    const url = `/api/v1/articles?limit=${limit}&skip=${limit * (page - 1)}`;
    try {
      const response = await fetch(url);
      if (response.status >= 200 && response.status < 300) {
        const json = await response.json();
        this.setState({
          ...this.getState(),
          items: json.result.items,
          currentPage: page,
        });
      }      
     } catch(err) {
        console.log('loadPages', err);
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
