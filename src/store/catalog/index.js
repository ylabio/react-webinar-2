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
      items: []
    };
  }

  async load(skip){
    const articles = await fetch(`api/v1/articles?limit=10&skip=${skip * 10}`);
    const count = await fetch("/api/v1/articles?limit=1&fields=items(*),count");
    const jsonArticles = await articles.json();
    const jsonCount = await count.json();

    this.setState({
      items: jsonArticles.result.items,
      count: jsonCount.result.count
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
}

export default CatalogState;
