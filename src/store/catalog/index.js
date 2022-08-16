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
      itemsQty: 0,
      pagSel: 1,
    };
  }

  /**
   * Загрузка данных о товарах из каталога
   */
  async load() {
    const response = await fetch(
      '/api/v1/articles?limit=10&skip=&fields=items(*),count');
    const json = await response.json();
    if (this.getState().pagSel === 1) {
      /**
       * Для первоначальной загрузки данных
       * Для возврата на первую страницу пагинации из подробного описания товара
       */
      this.setState({
        ...this.getState(),
        items: json.result.items,
        itemsQty: json.result.count
      });
      /**
       * Для возврата на выбранную страницу пагинации из подробного описания товара
       */
    } else {
      this.setState({
        ...this.getState(),
      })
    }
  }

  /**
   * Переход к просмотру других товаров из каталога после клика по элементу пагинации
   * @param pagSel {number}
   */
  async pagSurf(pagSel) {
    const response = await fetch(
      '/api/v1/articles?limit=10&skip=' + ((pagSel - 1) * 10) + '&fields=items(*),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      pagSel: pagSel
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
}

export default CatalogState;
