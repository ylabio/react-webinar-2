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
      scope: {total: 0, current: 1, maxItems: 10} // параметры пачки итемов
    };
  }

  async load(){
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      items: json.result.items
    });
  }

  /**
   * Подгрузить выбранную пачку итемов. 
   */
  async loadScope(scopeNumber) {
    if (!scopeNumber)
      scopeNumber = 1;

    const max = this.getState().scope.maxItems;
    const response = await fetch(`/api/v1/articles?limit=${max}&skip=${(scopeNumber - 1) * max}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      scope: {
        ...this.getState().scope,
        total: Math.ceil(json.result.count / this.getState().scope.maxItems),
        current: scopeNumber
      }
    });
  }

  /**
   * Задать номер текущей пачки итемов (страницы)
   */
  setCurrentScope(current) {
    const scope = this.getState().scope;
    if (current < 1)
      current = 1;
    if (current > scope.total)
      current = scope.total;
    this.setState({
      scope: {
        ...scope,
        current
      }
    });
  }

  /**
   * Задать размер пачки итемов
   */
  setMaxItems(maxItems) {
    const scope = this.getState().scope;
    this.setState({
      scope: {
        ...scope,
        maxItems
      }
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
