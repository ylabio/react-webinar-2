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
      size: 0
    };
  }

  async loadProduct(id){
    const response = await fetch(`/api/v1/articles?search%5Bids%5D=${id}&lang=ru&skip=0`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items
    });
  }

  async loadPreviews(pageNumber){
    const response = await fetch(`/api/v1/articles?lang=ru&limit=10&skip=${(pageNumber - 1) * 10}&fields=items%28_id%2C%20title%2C%20price%29%2C%20count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      size: json.result.count
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
