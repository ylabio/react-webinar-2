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
      pagItems: [],
      pagSel: 0,
    };
  }

  /**
   * Загрузка данных каталога
   */
  async load() {
    const response = await fetch('/api/v1/articles?lang=ru&limit=130&skip=0&fields=%2A');
    const json = await response.json();
    if (this.getState().pagSel <= 1) {
      /**
       * Для первоначальной загрузки данных
       * Для возврата на первую страницу пагинации из подробного описания товара
       */
      this.setState({
        items: json.result.items,
        pagItems: json.result.items.slice(0, 10),
        pagSel: 1
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
   * Переход к просмотру других товаров после клика по элементу пагинации
   * @param pagSel {number}
   */
  pagSurf(pagSel) {
    this.setState({
      ...this.getState(),
      pagItems: this.getState().items.slice((pagSel - 1) * 10, pagSel * 10),
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
