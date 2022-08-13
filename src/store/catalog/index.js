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
      currentArticle: null,
    };
  }

  clearCurrArticle() {
    this.setState(
      {
        ...this.getState(),
        currentArticle: null,
      })
  }

  async load(){
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items
    });
  }

  async loadArticle(id){
    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentArticle: json.result
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      ...this.getState(),
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      ...this.getState(),
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;
