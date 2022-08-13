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
      items: [],  //Массив товаров
      limit: 10,  //Лимит товаров, которые можно вывести
      totalCount: 0,  //Общее количество товаров
      currentPage: 0,  //Текущая страница (Выбранная пользователем)
      loading: true  //Состояние для отображения статуса загрузки (Спиннер)
    };
  }

  async load(page){
    this.setState({
      ...this.getState(),
      loading: true,
      currentPage: page
    })
    const {limit, currentPage} = this.getState()
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${(currentPage - 1) * limit}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      loading: false,
      totalCount: json.result.count
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
