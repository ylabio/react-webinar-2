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
      paramPage: { //обернуто в объект для удобного сравнения
        page: 1,
      },
      limit: 10, //можно закинуть в объект выше, вдруг значение придется менять, чтобы не писать новую функцию
    };
  }

  async load(page = {}){
    //проверка и бновление(если нужно) значения page
    const newPage = {...this.getState().paramPage, ...page};
    this.setState({
      ...this.getState(),
      paramPage: newPage,
    });

    const skip = (newPage.page - 1) * (this.getState().limit);
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
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
