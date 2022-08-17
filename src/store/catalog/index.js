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
      navigationPageSelected: 0,
      navigationPageSkip: 0,
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles?skip='+this.getState().navigationPageSkip+'&limit=10&fields=items(*),count');
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
      navigationPageSelected: this.getState().navigationPageSelected == 0 ? (json.result.count > 1 ? 1 : 0) : this.getState().navigationPageSelected,
      navigationPageSkip: this.getState().navigationPageSkip,
    });
  }

  /**
   * Обновление
   */
  update(){
    this.setState({
      ...this.getState(),
      navigationPageSkip: this.getState().navigationPageSelected * 10 - 10
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

  /**
   * Смена страницы
   */
   changePage(number = 1) {
    this.setState({
      ...this.getState(),
      navigationPageSelected: number,
      navigationPageSkip: this.getState().navigationPageSelected * 10
    })
    this.update();
    this.load()
  }
}

export default CatalogState;
