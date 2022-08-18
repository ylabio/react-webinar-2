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
      skip: 0
    };
  }

  async getCount(){
    const count = await fetch("/api/v1/articles?limit=1&fields=items(*),count");
    const jsonCount = await count.json();

    this.setState({...this.getState(), count: jsonCount.result.count});
  }

  async getArticles(skip){
    const articles = await fetch(`api/v1/articles?limit=10&skip=${skip * 10}`);
    const jsonArticles = await articles.json();

    this.setState({...this.getState(), items: jsonArticles.result.items});
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
   * Установить сдвиг для запроса
   */
  setSkip(skip){
    this.setState({...this.getState(), skip: skip-1});
  }
}

export default CatalogState;
